import myAxios from './httplib';
import config from './config.json';

let modules: FreeObject = {};

Object.keys(config).forEach(module => {
    let tmpArr = config[module] || [];
    modules[module] = {};

    tmpArr.forEach((item: FreeObject) => {
        let { url, method, func } = item;
        method = method.toLowerCase();

        let httpMethod;
        if (method === 'get') httpMethod = myAxios.get;
        if (method === 'post') httpMethod = myAxios.post;
        if (method === 'put') httpMethod = myAxios.put;
        if (method === 'delete') httpMethod = myAxios.delete;

        if (httpMethod) {
            modules[module][func] = httpMethod.bind(null, url);
        }
    })
})

function install(Vue: any) {
    Vue.prototype.$api = modules;
}

export default {
    install
}