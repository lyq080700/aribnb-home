import React, { useEffect, useState } from "react";
import Card from "../CardWithPic";
import { useSelector } from "react-redux";
import { getAllRoomDataAPI } from "@/api/api";
import { useDispatch } from "react-redux";
import { setRoom } from "@/store/roomStore";
import { Empty, Typography, Spin } from "antd";
import "./index.scss";

export default function Container({ className }) {
  const roomList = useSelector((state) => state.room);
  const searchParams = useSelector((state) => state.searchParams);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  //获取房源数据
  const getRoomData = async () => {
    const res = await getAllRoomDataAPI();
    dispatch(setRoom(res));
  };

  useEffect(() => {
    if (
      roomList.length === 0 &&
      searchParams.address.city === "" &&
      searchParams.address.country === ""
    ) {
      console.log("获取房源数据");
      getRoomData();
      setLoading(false);
    }
  }, [roomList]);

  return (
    <div
      className={`content-room px-6 max-w-[850px] 2xl:max-w-[1400px] xl:max-w-[1300px] lg:max-w-[1200px] mx-auto flex flex-wrap justify-start ${className}`}
    >
      {loading ? (
        <div className="w-[8%] mx-auto">
          <Spin size="large" />
        </div>
      ) : roomList.length === 0 ? (
        <div className="w-full">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<Typography.Text>抱歉,未找到房源哦</Typography.Text>}
          />
        </div>
      ) : (
        roomList.map((item, index) => (
          <Card key={index} hotel={item} className="card-item" />
        ))
      )}
    </div>
  );
}
