'use strict';

import axios from 'axios'
import qs from 'qs'
// import router from '../router'
axios.interceptors.request.use(
    config => {
        //鉴权配置
        // if (token) {
        //     config.headers.Authorization = 'Bearer ' + token
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        //鉴权拦截配置
        // let errorData = error.response;
        // if (errorData.status === 401) {
        //     // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页,或者授权不可用
        //     auth.logout();
        //     router.push({
        //         path: '/login'
        //     });
        // }
        return Promise.resolve(error.response)
    }
);

//封装请求方式
let cancelCallback = {};

function getAxios(method, url, params, baseURL, cancelStr) {
    let property = {
        hahah: 123,
        method: method,
        url: url,
        baseURL: baseURL,
        withCredentials: false,
        timeout: 0,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    if (cancelStr) {
        let CancelToken = axios.CancelToken;
        property.cancelToken = new CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            cancelCallback[cancelStr] = c;
        })
    }
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        property.data = qs.stringify(params);
        property.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        };
    } else {
        property.params = params;
    }
    console.log('cancelCallback', cancelCallback);
    return axios(property)
}

//导出请求方法,调用时若需要取消请求则需要传入唯一值得cancelStr，cancelStr为ALL时
export default {
    get(url, params, cancelStr) {
        return getAxios('GET', url, params, process.env.API_ROOT, cancelStr)
    },
    post(url, params, cancelStr) {
        return getAxios('POST', url, params, process.env.API_ROOT, cancelStr)
    },
    put(url, params, cancelStr) {
        return getAxios('PUT', url, params, process.env.API_ROOT, cancelStr)
    },
    patch(url, params, cancelStr) {
        return getAxios('PATCH', url, params, process.env.API_ROOT, cancelStr)
    },
    delete(url, params, cancelStr) {
        return getAxios('DELETE', url, params, process.env.API_ROOT, cancelStr)
    },
    cancel(str) {
        if (str === 'ALL') {
            for (let key in cancelCallback) {
                cancelCallback[key]();
            }
            cancelCallback = {};
        } else {
            cancelCallback[str]();
            delete cancelCallback[str];
        }
    }
};