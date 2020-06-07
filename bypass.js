function getUrlObj(url, method) {
    let config = require('./src/api/config.json');
    if (!config) return null;

    let modules = Object.keys(config).reduce((arr, moduleName) => {
        let tmpArr = config[moduleName];
        tmpArr.forEach(item => {
            item.module = moduleName;
        })
        arr.push(...tmpArr);

        return arr;
    }, [])


    let filters = modules.filter(item => {
        if (item.url === url && item.method.toLowerCase() === method) return true;
        return false;
    });

    if (filters.length === 0) return null;

    return filters[0];
}

function getData(urlObj) {
    if (!urlObj) return null;

    let {
        module: fileName, func
    } = urlObj;

    let module = require(`./src/api/modules/${fileName}.js`);

    if (typeof module[func] === 'function') return module[func]();
    return null;
}

module.exports = function (url, method) {
    let urlObj = getUrlObj(url, method);
    let data = getData(urlObj);

    return data;
}