"use client";
import Item from "./item";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setParams } from "@/store/searchStore";
import { useTypedSelector } from "@/store";
import Address from "./address";
import People from "./people";
import "./index.scss";
export default function Header({ isMobile }: { isMobile: boolean }):React.ReactElement {
  const searchBoxRef = useRef(null);
  // 搜索框提示选项框设置
  const [addressActive, setAddressActive] = useState<boolean>(false);
  const [timeActive, setTimeActive] = useState<boolean>(false);
  const [peopleActive, setPeopleActive] = useState<boolean>(false);
  // 搜索框激活状态样式设置
  const [activated, setActivated] = useState<boolean>(false);
  const [addressClass, setAddressClass] = useState<string>("");
  const [timeClass, setTimeClass] = useState<string>("");
  const [peopleClass, setPeopleClass] = useState<string>("");
  const activateClass =
    "bg-white rounded-[32px] hover:bg-white shadow-md shadow-[#ddd]";
  const hoverClass = "hover:bg-[#ddd]";
  //获取搜索参数
  const searchParams = useTypedSelector((state) => state.searchParams);
  const dispatch = useDispatch();
  const [location, setLocation] = useState<string>("");
  const [peopleText, setPeopleText] = useState<string>("");
  const [people, setPeople] = useState({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  });
  const [time, setTime] = useState("");
  //搜索按钮激活后移动样式处理
  const handleAddress = () => {
    // 搜索框激活
    setActivated(true);
    setAddressClass(activateClass);
    setTimeClass(hoverClass);
    setPeopleClass(hoverClass);
    //搜索框选项显示
    setAddressActive(true);
    setTimeActive(false);
    setPeopleActive(false);
  };
  const handleTime = () => {
    setActivated(true);
    setTimeClass(activateClass);
    setAddressClass(hoverClass);
    setPeopleClass(hoverClass);
    setAddressActive(false);
    setTimeActive(true);
    setPeopleActive(false);
  };
  const handlePeople = () => {
    setActivated(true);
    setPeopleClass(activateClass);
    setAddressClass(hoverClass);
    setTimeClass(hoverClass);
    setAddressActive(false);
    setTimeActive(false);
    setPeopleActive(true);
  };
  //点击空白区域关闭激活
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setActivated(false);
        setAddressClass("");
        setTimeClass("");
        setPeopleClass("");
        setAddressActive(false);
        setTimeActive(false);
        setPeopleActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTimeOnChange = (dateString:string,date:Date):void => {
    console.log(date, dateString);
    dispatch(
      setParams({
        ...searchParams,
        time: { start: dateString[0], end: dateString[1] },
      })
    );
  };
  return (
    <div className="max-w-[850px] mx-auto p-3">
      <div
        className={`border border-solid border-[#ddd] rounded-[32px] shadow-md ${
          activated ? "bg-[#EBEBEB]" : ""
        }`}
      >
        <div
          className="grid grid-cols-3 relative search-box"
          ref={searchBoxRef}
        >
          <Address
            location={location}
            setLocation={setLocation}
            handleAddress={handleAddress}
            addressClass={addressClass}
            addressActive={addressActive}
            isMobile={isMobile}
          />

          <div className="relative time" onClick={handleTime}>
            <Item
              title="日期"
              placholder="添加日期"
              className={timeClass}
              value={time}
              setValue={handleTimeOnChange}
            />
            <div className="search-divider"></div>
          </div>
          <People
            people={people}
            setPeople={setPeople}
            peopleText={peopleText}
            handlePeople={handlePeople}
            peopleClass={peopleClass}
            activated={activated}
            peopleActive={peopleActive}
            setPeopleText={setPeopleText}
            setPeopleActive={setPeopleActive}
            setAddressActive={setAddressActive}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}
