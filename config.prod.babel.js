import Path from 'path';
//导入webpack模块
import Webpack from 'webpack';
//导入打包前自动删除dist目录的插件
import cleanWebpackPlugin from 'clean-webpack-plugin';
//导入html打包插件
import HtmlPlugin from 'html-webpack-plugin';

//webpack配置
let config = {
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
