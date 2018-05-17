import Path from 'path';
//导入多线程打包插件
import HappyPack from 'happypack';
//导入vue-loader插件
import VueLoaderPlugin from 'vue-loader/lib/plugin';
//导入复制文件的插件
import CopyFilePlugin from 'copy-webpack-plugin';

//指定happypack插件的线程数
const happyThreadPool = HappyPack.ThreadPool({
    size: 4
});

//webpack配置
export default {
    //打包时遇到错误时不继续
    bail: true,

    //入口文件
    entry: {
        main: './src/main.js' //指定一个name为main的入口文件
    },

    //打包输出配置
    output: {
        path: Path.resolve('dist'), //编译后文件的目录，根目录是以./开头
        filename: 'static/[name].js' //编译后输出的js文件名，[name]表示原文件名，[hash:8]表示8个长度的随机字符串
    },

    //模块配置
    module: {
        //规则
        rules: [
            {
                test: /\.js$/, //规则匹配的文件后缀名
                use: 'happypack/loader?id=babel' //使用happypack插件打包
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: Path.resolve('src'),
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|gif|png|eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    //插件配置
    plugins: [
        //使用vue-loader插件
        new VueLoaderPlugin(),

        //使用happypack插件
        new HappyPack({
            id: 'babel', //对应上面rules里的loader?后面指定的id
            loaders: ['babel-loader?cacheDirectory'], //实际匹配处理的loader，cacheDirectory表示开启打包缓存
            threadPool: happyThreadPool, //线程数
            verbose: true //详情
        }),

        //使用拷贝文件插件
        new CopyFilePlugin([
            {
                from: './src/static', //源路径
                to: 'static', //目标路径，此路径为相对于dist下的路径
                ignore: [
                    //要忽略的文件
                    /node_modules/,
                    /.DS_Store/
                ]
            }
        ])
    ],

    //解析配置
    resolve: {
        //别名
        alias: {
            vue$: 'vue/dist/vue.esm.js' //使用esm版的vue.js
        }

        //忽略没有采用模块化的文件
        // noParse: /jquery|lodash/
    }
};
