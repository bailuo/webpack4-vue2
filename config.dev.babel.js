import Path from 'path';
//导入webpack模块
import Webpack from 'webpack';
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
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),

        //以下两个都用于dev-server热模块更新的插件
        new Webpack.NamedModulesPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
    ],

    //开发服务配置
    devServer: {
        host: '0.0.0.0', //监听ip
        port: 10080, //监听端口,
        hot: true, //启用热更新
        contentBase: Path.resolve('dist'), //定义web服务根目录
        inline: true, //使用内联模式自动更新客户端页面
        historyApiFallback: true, //使用html5 history路由，404会被重定向到/index.html
        quiet: false //不显示打包的信息
    }
};

//导出配置
export default config;
