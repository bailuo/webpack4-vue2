import Path from 'path';
//导入webpack模块
import Webpack from 'webpack';
//导入打包前自动删除dist目录的插件
import cleanWebpackPlugin from 'clean-webpack-plugin';
//导入html打包插件
import HtmlPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'optimize-css-assets-webpack-plugin';
import JsMinimizerPlugin from 'uglifyjs-webpack-plugin';

//webpack配置
let config = {
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
    },

    //插件配置
    plugins: [
        //使用html打包插件（自动插入script标签并在src中填写入口js文件的路径）
        new HtmlPlugin({
            template: './src/index.html', //指定要打包的html文件
            filename: 'index.html', //指定打包后的文件名，输出路径从output.path读取
            chunks: 'main', //指定js入口文件的name，对应entry属性里的设置
            hash: false, //启用hash字符串
            minify: {   //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        }),

        //Scope Hoisting作用域提升插件，使打包的文件更小
        new Webpack.optimize.ModuleConcatenationPlugin(),

        //使用webpack清理插件
        new cleanWebpackPlugin(['dist'])
    ],

    //解析配置
    resolve: {
        //scope hoisting功能配置，针对npm中的第三方模块优先采用jsnext:main中指向的ES6模块化语法的文件
        //此配置仅在生产模式下打包有效
        mainFields: ['jsnext:main', 'browser', 'main'],

        //指定node_modules所在位置，当import第三方模块时，直接从以下指定的路径里查找
        //注意，指定路径后，dev-server会无法启动，只能在打包时启用
        modules: [
            Path.resolve('src'),
            Path.resolve('node_modules')
        ]
    }
};

//导出配置
export default config;
