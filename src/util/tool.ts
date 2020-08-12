import base64 from 'base64';

/**
* 随机字符串
*/
export function makeRandom(){
  return 'xxx-' + (Math.random() / +new Date()).toString(36).replace(/\d/g, '').slice(1);
}

/**
* 获取数据类型
* @param {Object} obj
*/
export function getObjectType(obj: any){
  return obj === null ? 'null' : obj instanceof Array ? 'array' : typeof obj !== 'object' ? typeof obj : 'object';
}

/**
* 深拷贝
* @param {Object} obj
*/
export function deepClone(obj: any) {
  let type = getObjectType(obj);
  if(type === 'object'){
    let res: FreeObject = {};
    Object.keys(obj).forEach(key => {
      res[key] = deepClone(obj[key])
    })
    return res;
  }

  if(type === 'array'){
    let res:any[] = [];
    obj.forEach((item:any) => {
      res.push(deepClone(item));
    })
    return res;
  }
  return obj;
}

/**
* hex转rgba
* @param {String} color
* @param {Float} alp
*/
export function hexToRgba(color: string, alp: number){
  let tmp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if(!tmp) return '';

  let r = parseInt(tmp[1], 16);
  let g = parseInt(tmp[2], 16);
  let b = parseInt(tmp[3], 16);
  let a = alp;

  return `rgba(${r},${g},${b},${a})`;
}

/**
* rgba转rgb
* @param {String} color
*/
export function rgbaToRgb(color: string){
  let values = color.replace(/(rgba?|[\(\)]+|\s+)/g,'').split(',');
  
  let a = parseFloat(values[3]) || 1;
  let r = Math.floor(a * parseInt(values[0]) + (1-a) * 255);
  let g = Math.floor(a * parseInt(values[1]) + (1-a) * 255);
  let b = Math.floor(a * parseInt(values[2]) + (1-a) * 255);

  let rr = '0' + r.toString(16).slice(-2);
  let gg = '0' + g.toString(16).slice(-2);
  let bb = '0' + b.toString(16).slice(-2);

  return `#${rr}${gg}${bb}`;
}

/**
* base64编码，兼容中文
*/
export function encode(str: string){
  return base64.btoa(window.encodeURIComponent(str));
}

/**
* base64解码，兼容中文
*/
export function decode(str: string){
  return window.decodeURIComponent(base64.atob(str));
}

/**
* 字符串转小驼峰
* @param {String} str --a-_b--- => aBC
*/
export function camelCase(str: string){
  if(!str) return '';

  // 去除收尾的空格、横线、下划线
  let tmp = str.replace(/^[\_\-\s]*|[\_\-\s]*$/g, '');
  return tmp.replace(/[\-\_\s]+(\w)/g, (substr, $1) => $1.toUpperCase());
}

/**
* 字符串首字母大写
*/
export function upperFirst(str: string){
  if(!str.trim()) return '';

  return str.trim().replace(/^\w/, $1 => $1.toUpperCase());
}

/**
* 读cookie
* @param {String} key
*/
export function getCookie(key: string){
  let name = key + '=';
  let ca = document.cookie.split(';');
  for(let i=0,len=ca.length;i<len;i++){
    let c = ca[i];
    while(c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if(c.indexOf(name) !== -1) {
      return c.substring(name.length, c.length)
    }
  }

  return ''
}

export function dateFormat (date: Date, fmt: string): string{
  const o: FreeObject = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

