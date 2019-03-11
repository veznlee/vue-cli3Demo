import axios from 'axios'
// import qs from 'qs'
import local from './local'
import webConfig from '../config'
//当创建一个实例时进行默认设置
var tokenInstance = axios.create({
    baseURL:webConfig.serverUrl
});
tokenInstance.interceptors.request.use(function(config){
    const token = local.getLocal('accessToken');
    // 如果是post请求就把默认参数拼到data里面
    // const token = webConfig.testToken;//
    if(config.method === 'post') {
        //传递字符串
        //let data = qs.parse(config.data);
        // config.data = qs.stringify({
        //     accessToken: token,
        //     ...data
        // })
        delete config['headers']['Content-Type'];

        //传递json
        let data = config.data;
        config.data = {
            accessToken: token,
            ...data
        }
        // let tokenUrl = '?accessToken='+token;
        // config.url+=tokenUrl;
    }
    // 如果是get请求就拼到params里面
    if(config.method === 'get'){
        config.params = {
            accessToken: token,
            ...config.params
        }
    }
    return config;
},function(error){
    //当出现请求错误是做一些事
    return Promise.reject(error);
});
tokenInstance.interceptors.response.use(function (response) {
    //未登录
    if(response.data.code == 300){
        
    }else{
        // 对响应数据做点什么
        return response.data;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default tokenInstance;

