import Mock from "mockjs";
import { getRoomData, getAllRoomData } from "./mockData";
//1.拦截路径 方法 mock数据
Mock.mock(/api\/roomList\/filter/, "post", getRoomData);
Mock.mock(/api\/roomList/, "get", getAllRoomData);
