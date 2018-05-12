//导入基本配置文件
import base from './config.base.babel.js';
//导入开发环境配置文件
import dev from './config.dev.babel.js';
//导入生产环境配置文件
import prod from './config.prod.babel.js';
//导入配置文件合并插件
import merge from 'webpack-merge';

//定义最终配置变量
let finalConfig;

//判断命令行中传入的mode参数值
if (process.env.NODE_ENV === 'production') {
    finalConfig = merge(base, prod) //合并生产环境配置
} else {
    finalConfig = merge(base, dev); //合并开发环境配置
}

//导出最终配置
export default finalConfig;