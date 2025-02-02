import axios,{AxiosRequestConfig,AxiosError,AxiosResponse} from "axios";
import {Result} from "@/types/entity";
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 3000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse<Result>) {
    // 对响应数据做点什么
    const { code, data, message } = response.data;
    if (data && code == 200) {
      return data;
    } else {
      return Promise.reject(new Error(message || "没有数据"));
    }
  },
  function (error) {
    // 对响应错误做点什么
    const { response, message } = error || {};
    let errMsg = "";
    try {
      errMsg = response?.data?.message || message;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
    return Promise.reject(error);
  }
);

//给外部使用的请求方法
function request(config:AxiosRequestConfig){
  config.method = config.method || "get";
  return instance(config);
}
export default request;
