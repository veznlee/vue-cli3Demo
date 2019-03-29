import axios from 'axios'
import {Message} from 'iview';
// import qs from 'qs'
import local from './local'
import {urlConfig} from '@/config/index'

import router from '@/router/index'


/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    alert('登录过期');
    return;
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

//当创建一个实例时进行默认设置
let tokenInstance = axios.create({
    baseURL:urlConfig.serverUrl
});
tokenInstance.interceptors.request.use(function(config){
    // 添加token
    if(config.noToken){
        delete config.noToken;
    }else{
        const token = local.getLocal('accessToken') || '';
        config.headers.token = token;
    };
    if(config.method === 'post') {
        config['headers']['Content-Type'] = 'application/json';
    }
    if(config.method === 'file') {
        config.method = 'post';
        if(config.isUpdate){
            config.method = 'put';
            delete config.isUpdate;
        }
        config['headers']['Content-Type'] = 'multipart/form-data';
    }
    return config;
},function(error){
    return Promise.reject(error);
});

// 对响应数据做点什么
tokenInstance.interceptors.response.use(function (response) {
    if(response.data.code*1 == -1){
        toLogin();
        return;
    }else{
        return response.data;
    }
}, function (error) {
    Message.error('您的网络好像出现了问题');
    //return Promise.reject(error);
});


/**
 * 提交表单数据
 * */
let tokenFormInstance = axios.create({
    baseURL:urlConfig.serverUrl,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function(data, headers){
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
    }]
});
tokenFormInstance.interceptors.request.use(function(config){
    if(config.noToken){
        delete config.noToken;
    }else{
        const token = local.getLocal('accessToken') || '';
        config.headers.token = token;
    };
    return config;
},function(error){
    return Promise.reject(error);
});
tokenFormInstance.interceptors.response.use(function (response) {
    if(response.data.code*1 == -1){
        toLogin();
    }else{
        return response.data;
    }
}, function (error) {
    return Promise.reject(error);
});

let downloadFile = function(filePath){
    const token = local.getLocal('accessToken') || '';
    axios({
        method: 'post',
        url: 'http://192.168.0.106:8081/bs/downloadFile',
        params: {filePath,token},
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        responseType:'blob'
    })
    .then(response => {
        // 转换为base64，可以直接放入a表情href
        if(response.data.type === 'application/force-download'){
            var reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onload = function (e) {
                let fileName = filePath.split("\\").pop();
                // 转换完成，创建一个a标签用于下载
                var a = document.createElement('a');
                a.download = fileName;
                a.href = e.target.result;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            }
        }else{
            Message.warning('文件下载失败');
        }
        //resolve(response.data);
    }).catch(err => {
        Message.error('您的网络好像出现了问题');
    })
}

export {tokenInstance, tokenFormInstance, downloadFile}