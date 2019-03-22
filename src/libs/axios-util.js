import axios from 'axios'
// import qs from 'qs'
import local from './local'
import webConfig from '../config'

// 普通请求
const $tokenInstance = axios.create({
    baseURL:webConfig.serverUrl
});
export function $get(url, params = {}){
    const token = local.getLocal('accessToken');
    // token 放置在headers
    $tokenInstance.interceptors.request.use(function(config){
        config.headers.token = token;
    });
    return new Promise((resolve, reject) => {
        $tokenInstance.get(url, {
            params:params
        }).then(response => {
            resolve(response.data)
        }).catch(err =>{
            reject(err);
        })
    })
}

export function $post(url, data = {}){
    const token = local.getLocal('accessToken');
    // token 放置在headers
    $tokenInstance.interceptors.request.use(function(config){
        config.headers.token = token;
    });
    // return new Promise((resolve, reject) => {
    //     $tokenInstance.post(url,data)
    //     .then(response => {
    //         resolve(response.data)
    //     }).catch(err =>{
    //         reject(err);
    //     })
    // })
}

// formData请求
const $formInstance = axios.create({
    baseURL:webConfig.serverUrl,
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
export function $form(url, data = {}){
    const token = local.getLocal('accessToken') || '';
    // token 放置在headers
    $formInstance.interceptors.request.use(function(config){
        console.log(config);
        config.headers.token = token;
    });
    // return new Promise((resolve, reject) => {
    //     $formInstance.post(url,data)
    //     .then(response => {
    //         resolve(response.data)
    //     }).catch(err =>{
    //         reject(err);
    //     })
    // })

    // $formInstance.post(url,data)
    // .then(response => {
    //     return Promise.resolve(response.data)
    // }).catch(err =>{
    //     return Promise.reject(err);
    // })
    return $formInstance.post(url,data);
}