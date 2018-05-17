//导入js-cookie包
import Cookie from 'js-cookie';
//导入base64编码包
import { Base64Encode } from '../global/common.js';

//授权验证中间件
export default (to, from, next) => {
    //检查cookie中是否存在token
    let token = Cookie.get('token');

    if (token === '' || token === null || token === undefined) {
        //如果不存在则跳转到登录页，并带上get参数msg
        next({
            path: '/login',
            query: { msg: Base64Encode('请先登录后再访问后台管理') }
        });
    } else {
        //如果存在则放行
        next();
    }
};
