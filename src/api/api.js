/***
 * 封装整个项目的api请求
 */

import request from "./request";
//根据请求参数筛选房源信息
export const getRoomDataAPI = (params) => {
  return request({
    url: "/roomList/filter/",
    method: "post",
    data: params,
  });
};
//获取所有房源信息
export const getAllRoomDataAPI = () => {
  return request({
    url: "/roomList/",
    method: "get",
  });
};
