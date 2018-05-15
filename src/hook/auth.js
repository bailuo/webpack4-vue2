//导入getCookie函数
import Cookie from 'js-cookie'

//授权验证中间件
export default (to, from, next) => {
    //检查cookie中是否存在token
    let token = Cookie.get('token');
    console.log(token);
    if (token === '' || token === null || token === undefined) {
        //如果不存在则跳转到登录页
        next('/login')
    } else {
        //如果存在则放行
        //console.log(token);
        next()
    }
};