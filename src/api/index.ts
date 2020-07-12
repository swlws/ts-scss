import myAxios from './httplib';
import api from './api'
import config from './config.json';

const collectKeys = (obj: FreeObject, pre = '') => {
    let res = [];
    Object.keys(obj).forEach(key => {

    })
}

const ruleError = (key: string, pre?: string) => {
    return {
        key: `${pre ? pre + '.' : ''}${key}`,
        msg: `Param Only Support [String, Number, Boolean, Array, Object]`
    }
}

/**
 * 规则语法的校验，仅支持五种类型String, Number, Boolean, Array, Object
 * @param rule 
 */
function ruleValidate(rule: FreeObject, pre?: string): Array<ruleErrorCode> {
    if (!rule) return [] as Array<ruleErrorCode>;

    let types = [String, Number, Boolean, Array, Object];

    let res: Array<ruleErrorCode> = new Array();
    Object.keys(rule).forEach(key => {
        let v = rule[key];

        if (Array.isArray(v)) {
            v.forEach(type => {
                if (!types.includes(type)) {
                    res.push(ruleError(key, pre))
                }
            })
        } else if (typeof v === 'object') {
            let tmp: Array<ruleErrorCode> = ruleValidate(v as FreeObject, key);
            res.push(...tmp)
        } if (typeof v !== 'function' && !types.includes(v)) {
            res.push(ruleError(key, pre))
        }
    })
    return res;
}

const paramValidate = (rules: FreeObject, params: FreeObject) => {

}

let modules: FreeObject = {};

Object.keys(api).forEach(moduleName => {
    modules[moduleName] = {};

    let module: FreeObject = (api as any)[moduleName] || {};
    Object.keys(module).forEach(funcName => {
        let { url, method, params } = module[funcName]

        let ruleValidateRes = ruleValidate(params);
        console.log(ruleValidateRes)

        method = method.toLowerCase();

        let httpMethod;
        if (method === 'get') httpMethod = myAxios.get;
        if (method === 'post') httpMethod = myAxios.post;
        if (method === 'put') httpMethod = myAxios.put;
        if (method === 'delete') httpMethod = myAxios.delete;

        if (httpMethod) {
            modules[moduleName][funcName] = httpMethod.bind(null, url);
        }
    })
})

function install(Vue: any) {
    Vue.prototype.$api = modules;
}

export default {
    install
}