import Path from 'path';
import Webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'optimize-css-assets-webpack-plugin';
import JsMinimizerPlugin from 'uglifyjs-webpack-plugin';
import StyleExtractPlugin from 'mini-css-extract-plugin';

//webpack配置
export default {
    //打包输出配置
    output: {
        publicPath: 'http://127.0.0.1:10080/' //打包后文件引用的前缀，主要被html-webpack-plugin插件生成html文件时使用
    },
    //模块配置
    module: {
        //规则
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [StyleExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.css$/,
                use: [StyleExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    //优化配置
    optimization: {
        minimizer: [
            //启用js压缩插件
            new JsMinimizerPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            //启用css压缩插件
            new CssMinimizerPlugin({
                chunkFilename: '[id].css'
            })
        ]
    },

    //插件配置
    plugins: [
        //使用html打包插件（自动插入script标签并在src中填写入口js文件的路径）
        new HtmlPlugin({
            template: './src/index.html', //指定要打包的html文件
            filename: 'index.html', //指定打包后的文件名，输出路径从output.path读取
            chunks: 'main', //指定js入口文件的name，对应entry属性里的设置
            hash: true, //启用hash字符串来控制缓存更新
            minify: {
                //压缩HTML文件
                html5: true, //html5文件类型
                minifyCSS: true, //压缩css
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        }),

        //样式代码提取插件配置
        new StyleExtractPlugin({
            filename: 'static/[name].css' //提取出来的样式保存文件
        }),

        //Scope Hoisting作用域提升插件，使打包的文件更小
        new Webpack.optimize.ModuleConcatenationPlugin()
    ],

    //解析配置
    resolve: {
        //scope hoisting功能配置，针对npm中的第三方模块优先采用jsnext:main中指向的ES6模块化语法的文件
        //此配置仅在生产模式下打包有效
        mainFields: ['jsnext:main', 'browser', 'main'],

        //指定node_modules所在位置，当import第三方模块时，直接从以下指定的路径里查找
        //注意，指定路径后，dev-server会无法启动，只能在打包时启用
        modules: [Path.resolve('src'), Path.resolve('node_modules')]
    }
};
