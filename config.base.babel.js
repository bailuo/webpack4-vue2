import Path from 'path';
//导入多线程打包插件
import HappyPack from 'happypack';
//导入vue-loader插件
import VueLoaderPlugin from 'vue-loader/lib/plugin';
//导入style提取至css文件的插件
import StyleExtractPlugin from 'mini-css-extract-plugin';
//导入css压缩插件
import CssMinimizerPlugin from 'optimize-css-assets-webpack-plugin';
//导入js压缩插件
import JsMinimizerPlugin from 'uglifyjs-webpack-plugin';
//导入复制文件的插件
import CopyFilePlugin from 'copy-webpack-plugin';

//指定happypack插件的线程数
const happyThreadPool = HappyPack.ThreadPool({
    size: 4
});

const publicPath = 'http://127.0.0.1:10080/';

console.log('Mode: \x1b[32m\x1b[1m'+process.env.NODE_ENV+'\x1b[0m');

//webpack配置
let config = {
    //打包时遇到错误时不继续
    bail: true,

    //入口文件
    entry: {
        main: './src/main.js',   //指定一个name为main的入口文件
    },

    //打包输出配置
    output: {
        path: Path.resolve('dist'),             //编译后文件的目录，根目录是以./开头
        filename: 'static/[name].js',           //编译后输出的js文件名，[name]表示原文件名，[hash:8]表示8个长度的随机字符串
        publicPath: publicPath   //打包后文件引用的前缀，主要被html-webpack-plugin插件生成html文件时使用
    },

    //模块配置
    module: {
        //规则
        rules: [
            {
                test: /\.js$/,                      //规则匹配的文件后缀名
                use: 'happypack/loader?id=babel',   //使用happypack插件打包
                include: Path.resolve('src'),       //指定要打包的文件路径
                exclude: /node_modules/             //用正则指定要排除的路径
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: Path.resolve('src'),
                exclude: /node_modules/
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [StyleExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                include: Path.resolve('src'),
                exclude: /node_modules/
            }
        ]
    },

    //插件配置
    plugins: [
        //使用vue-loader插件
        new VueLoaderPlugin(),

        //使用happypack插件
        new HappyPack({
            id: 'babel',                                //对应上面rules里的loader?后面指定的id
            loaders: ['babel-loader?cacheDirectory'],   //实际匹配处理的loader，cacheDirectory表示开启打包缓存
            threadPool: happyThreadPool,                //线程数
            verbose: true                               //详情
        }),

        //使用拷贝文件插件
        new CopyFilePlugin([{
            from: './src/static',   //源路径
            to: 'static',           //目标路径，此路径为相对于dist下的路径
            ignore: [               //要忽略的文件
                /node_modules/,
                /.DS_Store/,
                'test-ignore'
            ]
        }]),

        //样式代码提取插件配置
        new StyleExtractPlugin({
            filename: 'static/[name].css'   //提取出来的样式保存文件
        })
    ],

    //解析配置
    resolve: {
        //别名
        alias: {
            'vue$': 'vue/dist/vue.esm.js'   //使用esm版的vue.js
        },

        //scope hoisting功能配置，针对npm中的第三方模块优先采用jsnext:main中指向的ES6模块化语法的文件
        //此配置仅在生产模式下打包有效
        mainFields: ['jsnext:main', 'browser', 'main'],

        //忽略没有采用模块化的文件
        // noParse: /jquery|lodash/
    },

    //优化配置
    optimization: {
        //提取公共代码与第三方代码，将多个入口重复加载的公共资源提取出来
        splitChunks: {
            chunks: "initial",                  //必须三选一： "initial" | "all"(默认就是all) | "async"
            minSize: 0,                         //最小尺寸，默认0
            minChunks: 1,                       //最小 chunk ，默认1
            maxAsyncRequests: 1,                //最大异步请求数， 默认1
            maxInitialRequests: 1,              //最大初始化请求书，默认1
            // name: () => {},                     //名称，此选项可接收function
            //这里开始设置缓存的 chunks
            // cacheGroups: {
            //     priority: "0",                  //缓存组优先级 false | object |
            //     vendor: {                       //key 为entry中定义的 入口名称
            //         chunks: "initial",          //必须三选一： "initial" | "all" | "async"(默认就是异步)
            //         // test: /jquery|lodash/,   //正则规则验证，如果符合就提取 chunk
            //         name: "vendor",             //要缓存的 分隔出来的 chunk 名称
            //         minSize: 0,
            //         minChunks: 1,
            //         enforce: true,
            //         maxAsyncRequests: 1,        //最大异步请求数， 默认1
            //         maxInitialRequests: 1,      //最大初始化请求书，默认1
            //         reuseExistingChunk: true    //可设置是否重用该chunk（查看源码没有发现默认值）
            //     }
            // }
        },
        //分割webpack的运行时代码块
        runtimeChunk: {
            name: 'webpack' //webpack运行时文件名
        },
        /*
        代码最小化
        注意，如果配置了此项，即便webpack的mode值为production，也不会启用自带的压缩功能
        因此，这里要把js和css的压缩插件都配置进来
        */
        minimizer: [
            //启用js压缩插件
            new JsMinimizerPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            //启用css压缩插件
            new CssMinimizerPlugin()
        ]
    }
};

//导出配置
export default config;
