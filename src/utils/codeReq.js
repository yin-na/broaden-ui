import axios from 'axios'
import store from '@/store'
import config from '@/config'

//取消请求
let CancelToken = axios.CancelToken
let cancel, promiseArr = {}

// 请求超时的时间限制
axios.defaults.timeout = 30000
// 请求域名
axios.defaults.baseURL = config.host

// request interceptor
axios.interceptors.request.use(
    config => {
        if (promiseArr[config.url]) {
            promiseArr[config.url]('操作取消')
            promiseArr[config.url] = cancel
        } else {
            promiseArr[config.url] = cancel
        }

        if (store.getters.codeToken) {
            config.headers.common['Authorization'] = 'Bearer ' + store.getters.codeToken // 让每个请求携带自定义token 请根据实际情况自行修改
        }

        config.header = {
            'Content-Type': 'application/json'
        }

        const headers = config.headers
        if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
            return config.data
        }

        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
axios.interceptors.response.use(
    response => {
        const res = response

        return res
    },
    error => {
        return Promise.reject(error)
    }
)

// 封装请求
const request = (url, data, method, params, type) => {
    return axios({
        method: method,
        url: url,
        params: params,
        responseType: type ? type : '',
        data: data,
        cancelToken: new CancelToken(c => {//取消多次重复请求
            cancel = c
        })
    })
}

export default {
    axios: axios,
    request(url, param, method, params, type) {
        return request(url, param, method, params, type)
    },
    get(url, data, params, type) {
        return request(url, data, 'get', params, type)
    },
    post(url, data, params, type) {
        return request(url, data, 'post', params, type)
    },
    put(url, data, params, type) {
        return request(url, data, 'put', params, type)
    },
    delete(url, data, params, type) {
        return request(url, data, 'delete', params, type)
    },
}
