/***
 * 封装整个项目的api请求
 */

import request from "./request";
import {SearchParamsInterface} from "@/types/entity";
export enum API {
  getRoomDataAPI = "/roomList/filter/",
  getAllRoomDataAPI = "/roomList/",
}


//根据请求参数筛选房源信息
export const getRoomDataAPI = (params:SearchParamsInterface) => {
  return request({
    url: API.getRoomDataAPI,
    method: "post",
    data: params,
  });
};
//获取所有房源信息
export const getAllRoomDataAPI = () => {
  return request({
    url: API.getAllRoomDataAPI,
    method: "get",
  });
};
