import axios from 'axios';
import Qs from "qs";
import Log from '@/util/log';

const instance = axios.create({
    baseURL: '',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
    paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
    },
});

const statusCode: FreeObject = {
    300: '重定向错误',
    400: '参数错误',
    500: '服务器错误',
}

const errorHandler = (context: string, error: any) => {
    let code = error.response.status;

    Log.error(`httplib.js ${context}`, `Code: ${code}, ${statusCode[code] || '未知错误'}`);
}

export function get(url: string, params: any, responseType: any) {
    return instance.get(url, {
        params, responseType
    }).catch(err => {
        errorHandler('get', err)
    })
}

export function post(url: string, data: any, responseType: any) {
    return instance.post(url, {
        data, responseType
    }).catch(error => {
        errorHandler('post', error)
    })
}

export function put(url: string, data: any, responseType: any) {
    return instance.put(url, {
        data, responseType
    }).catch(err => {
        errorHandler('put', err)
    })
}

export function del(url: string, data: any, responseType: any) {
    return instance.delete(url, {
        data, responseType
    }).catch(err => {
        errorHandler('del', err)
    })
}

export default {
    get, post, put, delete: del
}