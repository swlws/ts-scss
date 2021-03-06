const modules: FreeObject = {};

// 读取./modules目录下的配置文件
const requireComponent = require.context("./modules", false, /.*ts/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const name = (fileName.split("/").pop() as string).replace(/\.\w+$/, "");
  modules[name] = componentConfig.default;
});

// 根据浏览器语言，获取对应的国际化配置
let lang: FreeObject;
if (navigator) {
  const language = navigator.language;
  lang = modules[language];
}

// 存在，则返回对应的转移字符；不存在，返回path
const $t = (path: string): string => {
  if (!lang) return path;
  if (!path) return "";

  const str: FreeObject | string = path.split(".").reduce((pre, next) => {
    return pre[next] || {};
  }, lang);

  return typeof str === "string" ? str : path;
};

export default {
  install(Vue: any) {
    Vue.prototype.$t = $t;
  }
};
