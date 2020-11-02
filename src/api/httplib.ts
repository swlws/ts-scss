import axios from "axios";
// import Qs from "qs";
import Log from "@/util/log";

// function filterUndefinedParams(params: FreeObject) {
//   if (typeof params === "object") {
//     for (const key in params) {
//       if (params.hasOwnProperty(key) && typeof params[key] === "undefined")
//         delete params[key];
//     }
//   }
// }

const instance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  responseType: "json"
  // transformRequest: [
  //   data => {
  //     if (data instanceof FormData) return data;

  //     return Qs.stringify(data);
  //   }
  // ],
  // paramsSerializer: function (params) {
  //   return Qs.stringify(filterUndefinedParams(params));
  // }
});

const errorHandler = (context: string, error: any) => {
  Log.error(`httplib.js ${context}`, `Error: ${error}`);
};

export function get(url: string, params: FreeObject, config: FreeObject) {
  return instance
    .get(url, {
      params,
      ...config
    })
    .then(res => res.data)
    .catch(err => {
      errorHandler("get", err);
    });
}

export function post(url: string, data: FreeObject, config: FreeObject) {
  return instance
    .post(url, data, {
      ...config
    })
    .then(res => res.data)
    .catch(error => {
      errorHandler("post", error);
    });
}

export function put(url: string, data: FreeObject, config: FreeObject) {
  return instance
    .put(url, data, {
      ...config
    })
    .then(res => res.data)
    .catch(err => {
      errorHandler("put", err);
    });
}

export function del(url: string, data: FreeObject, config: FreeObject) {
  return instance
    .delete(url, {
      data: data,
      ...config
    })
    .then(res => res.data)
    .catch(err => {
      errorHandler("del", err);
    });
}

export default {
  get,
  post,
  put,
  delete: del
};
