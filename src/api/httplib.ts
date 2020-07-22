import axios from "axios";
import Qs from "qs";
import Log from "@/util/log";

function filterUndefinedParams(params: FreeObject) {
  if (typeof params === "object") {
    for (const key in params) {
      if (params.hasOwnProperty(key) && typeof params[key] === "undefined")
        delete params[key];
    }
  }
}

const instance = axios.create({
  baseURL: "",
  timeout: 1000,
  // headers: { 'Content-Type': 'application/json' },
  responseType: "json",
  transformRequest: [
    data => {
      if (data instanceof FormData) return data;

      return Qs.stringify(data);
    }
  ],
  paramsSerializer: function(params) {
    return Qs.stringify(filterUndefinedParams(params));
  }
});

const statusCode: FreeObject = {
  300: "重定向错误",
  400: "参数错误",
  500: "服务器错误"
};

const errorHandler = (context: string, error: any) => {
  const code = error.response.status;

  Log.error(
    `httplib.js ${context}`,
    `Code: ${code}, ${statusCode[code] || "未知错误"}`
  );
};

export function get(url: string, params: any, responseType: any) {
  return instance
    .get(url, {
      params,
      responseType
    })
    .then(res => res.data)
    .catch(err => {
      errorHandler("get", err);
    });
}

export function postJson(url: string, data: any, responseType: any) {
  return axios
    .post(url, data, { responseType })
    .then(res => res.data)
    .catch(error => {
      errorHandler("postJson", error);
    });
}

export function post(url: string, data: any, responseType: any) {
  return instance
    .post(url, data, {
      responseType
    })
    .then(res => res.data)
    .catch(error => {
      errorHandler("post", error);
    });
}

export function put(url: string, data: any, responseType: any) {
  return instance
    .put(url, data, {
      responseType
    })
    .then(res => res.data)
    .catch(err => {
      errorHandler("put", err);
    });
}

export function del(url: string, params: any, responseType: any) {
  return instance
    .delete(url, {
      params,
      responseType
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
  delete: del,
  postJson
};
