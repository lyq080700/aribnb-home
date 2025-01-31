"use client";
import Item from "./item";
import Card from "../CardContainer";
import { useDispatch } from "react-redux";
import { setParams } from "@/store/searchStore";
import { setRoom } from "@/store/roomStore";
import { useTypedSelector } from "@/store";
import { getRoomDataAPI } from "@/api/api";
import dayjs from "dayjs";
import { SearchParamsInterface } from "@/types/entity";
import {
  SearchOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
type PeopleProps = {
  handlePeople: () => void;
  setPeopleActive: (active: boolean) => void;
  setAddressActive: (active: boolean) => void;
  peopleClass: string;
  peopleText: string;
  isMobile: boolean;
  activated: boolean;
}
type PeopleItem = SearchParamsInterface["people"]
type PeopleOptionsProps = {
  peopleActive: boolean;
  people: PeopleItem;
  setPeople: (people: PeopleItem) => void;
  isMobile: boolean;
  setPeopleText: (text: string) => void;
}
export default function People(props:PeopleProps&PeopleOptionsProps) {
  const searchParams = useTypedSelector((state) => state.searchParams);
  const dispatch = useDispatch();
  const handleSearch = async (searchParams:SearchParamsInterface, e:React.MouseEvent) => {
    props.setPeopleActive(false);
    props.setAddressActive(false);
    e.stopPropagation();
    let newParams = { ...searchParams };
    //日期没选择则用最近一周时间
    if (searchParams.time.start == "" && searchParams.time.end == "") {
      //默认一周时间
      const nowTime = dayjs().format("YYYY-MM-DD");
      const weekTime = dayjs().add(1, "week").format("YYYY-MM-DD");
      dispatch(
        setParams({
          ...searchParams,
          time: { start: nowTime, end: weekTime },
        })
      );
      newParams.time = { start: nowTime, end: weekTime };
    }
    console.log("searchParams", newParams);
    const roomData = await getRoomDataAPI(newParams);
    dispatch(setRoom(roomData));
  };

  return (
    <div className="relative people" onClick={props.handlePeople}>
      <Item
        title="人员"
        placholder="添加人数"
        className={props.peopleClass}
        value={props.peopleText}
      />
      <div
        className="search-button"
        onClick={(e) => handleSearch(searchParams, e)}
      >
        <button className="text-white bg-[#FF385C] rounded-[26px] border-none cursor-pointer p-4 flex items-center">
          <SearchOutlined style={{ fontSize: "20px" }} />
          {props.activated && !props.isMobile && (
            <div className="text-[16px] ml-2">搜索</div>
          )}
        </button>
      </div>
      <PeopleOptions
        peopleActive={props.peopleActive}
        people={props.people}
        setPeopleText={props.setPeopleText}
        setPeople={props.setPeople}
        isMobile={props.isMobile}
      />
    </div>
  );
}

const enum PeopleType {
  Adult = "adult",
  Child = "child",
  Infant = "infant",
  Pet = "pet",
}

function PeopleOptions(props:PeopleOptionsProps) {
  const searchParams = useTypedSelector((state) => state.searchParams);
  const dispatch = useDispatch();
  const btactivateClass = "#c8c8c8";
  const btdeactivateClass = "#f4f4f4";
  //人数选择
  
  const handleMinus = (e: React.MouseEvent, flag:PeopleType) => {
    e.stopPropagation();
    if (props.people[flag] == 0) {
      return;
    }
    if (
      (props.people[PeopleType.Infant] > 0 ||
        props.people[PeopleType.Pet] > 0 ||
        props.people[PeopleType.Child] > 0) &&
      flag === PeopleType.Adult &&
      props.people[PeopleType.Adult] <= 1
    ) {
      return;
    }
    dispatch(
      setParams({
        ...searchParams,
        people: {
          ...searchParams.people,
          [flag]: searchParams.people[flag] - 1,
        },
      })
    );
    props.setPeople({ ...props.people, [flag]: props.people[flag] - 1 });
    let num =
      props.people[PeopleType.Adult] +
      props.people[PeopleType.Child] +
      props.people[PeopleType.Infant] +
      props.people[PeopleType.Pet] -
      1;
    // if (flag === "adult" || flag === "child") {
    //   num = people["adult"] + people["child"] - 1;
    // } else {
    //   num = people[flag] - 1;
    // }
    // const res = handlePeopleText(flag, peopleText, num);
    props.setPeopleText(num === 0 ? "" : num + "位房客");
  };
  const handlePlus = (e: React.MouseEvent, flag:PeopleType): void => {
    let num = 0;
    e.stopPropagation();
    if (flag === PeopleType.Adult && props.people[flag] >= 15) {
      return;
    }
    if (flag === PeopleType.Child && props.people[flag] >= 10) {
      return;
    }
    if ((flag === PeopleType.Infant || flag === PeopleType.Pet) && props.people[flag] >= 3) {
      return;
    }
    if (
      (flag === PeopleType.Infant || flag === PeopleType.Pet || flag === PeopleType.Child) &&
      props.people.adult === 0
    ) {
      console.log("adult", { ...props.people, adult: props.people.adult + 1 });
      dispatch(
        setParams({
          ...searchParams,
          people: {
            ...searchParams.people,
            [flag]: searchParams.people[flag] + 1,
            adult: searchParams.people.adult + 1,
          },
        })
      );
      props.setPeople({
        ...props.people,
        adult: props.people.adult + 1,
        [flag]: props.people[flag] + 1,
      });
      num += 1;
    } else {
      dispatch(
        setParams({
          ...searchParams,
          people: {
            ...searchParams.people,
            [flag]: searchParams.people[flag] + 1,
          },
        })
      );
      props.setPeople({ ...props.people, [flag]: props.people[flag] + 1 });
    }

    num +=
      props.people[PeopleType.Adult] +
      props.people[PeopleType.Child] +
      props.people[PeopleType.Infant] +
      props.people[PeopleType.Pet] +
      1;
    // if (flag === "adult" || flag === "child") {
    //   num = people["adult"] + people["child"] + 1;
    // } else {
    //   num = people[flag] + 1;
    // }
    // const resText = handlePeopleText(flag, peopleValueText, num);
    props.setPeopleText(num === 0 ? "" : num + "位房客");
  };

  //控制成人人数选择
  const adultOptions = (): boolean => {
    if (
      (props.people.child > 0 ||
        props.people.infant > 0 ||
        props.people.pet > 0) &&
      props.people.adult <= 1
    ) {
      return false;
    }
    if (props.people.adult <= 0) return false;
    return true;
  };

  return (
    <Card
      className={`people-options  max-h-[330px] right-0 ${
        props.peopleActive ? "visible" : "invisible"
      } ${props.isMobile ? "min-w-[320px]" : "min-w-[410px]"}`}
    >
      <div className="mx-4 pb-6" style={{ borderBottom: "1px solid #ddd" }}>
        <div className=" mt-2 flex items-center justify-between">
          <div>
            <div className="text-[16px] text-[#222]">成人</div>
            <div className="text-[14px] text-[#999] mt-1">13岁或以上</div>
          </div>
          <div className="grid grid-cols-3">
            <div
              className={`cursor-pointer`}
              onClick={(e) => handleMinus(e, PeopleType.Adult)}
            >
              <MinusCircleOutlined
                style={{
                  fontSize: "30px",
                  color: adultOptions() ? btactivateClass : btdeactivateClass,
                }}
              />
            </div>
            <div className="text-center leading-8">{props.people.adult}</div>
            <div
              className={`cursor-pointer`}
              onClick={(e) => handlePlus(e, PeopleType.Adult)}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: "30px",
                  color:
                    props.people.adult < 15
                      ? btactivateClass
                      : btdeactivateClass,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 pb-6" style={{ borderBottom: "1px solid #ddd" }}>
        <div className=" mt-6 flex items-center justify-between">
          <div>
            <div className="text-[16px] text-[#222]">儿童</div>
            <div className="text-[14px] text-[#999] mt-1">2 - 12岁</div>
          </div>
          <div className="grid grid-cols-3">
            <div
              className={`cursor-pointer`}
              onClick={(e) => handleMinus(e, PeopleType.Child)}
            >
              <MinusCircleOutlined
                style={{
                  fontSize: "30px",
                  color:
                    props.people.child > 0
                      ? btactivateClass
                      : btdeactivateClass,
                }}
              />
            </div>
            <div className="text-center leading-8">{props.people.child}</div>
            <div
              className={`cursor-pointer`}
              onClick={(e) => handlePlus(e, PeopleType.Child)}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: "30px",
                  color:
                    props.people.child < 10
                      ? btactivateClass
                      : btdeactivateClass,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 pb-6" style={{ borderBottom: "1px solid #ddd" }}>
        <div className=" mt-6 flex items-center justify-between">
          <div>
            <div className="text-[16px] text-[#222]">婴儿</div>
            <div className="text-[14px] text-[#999] mt-1">2 岁以下</div>
          </div>
          <div className="grid grid-cols-3">
            <div
              className={`cursor-pointer`}
              onClick={(e) => handleMinus(e, PeopleType.Infant)}
            >
              <MinusCircleOutlined
                style={{
                  fontSize: "30px",
                  color:
                    props.people.infant > 0
                      ? btactivateClass
                      : btdeactivateClass,
                }}
              />
            </div>
            <div className="text-center leading-8">{props.people.infant}</div>
            <div
              className={`cursor-pointer`}
              onClick={(e) => handlePlus(e, PeopleType.Infant)}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: "30px",
                  color:
                    props.people.infant < 3
                      ? btactivateClass
                      : btdeactivateClass,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 pb-6">
        <div className=" mt-6 flex items-center justify-between">
          <div>
            <div className="text-[16px] text-[#222]">宠物</div>
            <div className="text-[14px] text-[#999] mt-1">
              需要携带服务类动物？
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div
              className={`cursor-pointer`}
              onClick={(e) => handleMinus(e, PeopleType.Pet)}
            >
              <MinusCircleOutlined
                style={{
                  fontSize: "30px",
                  color:
                    props.people.pet > 0 ? btactivateClass : btdeactivateClass,
                }}
              />
            </div>
            <div className="text-center leading-8">{props.people.pet}</div>
            <div
              className={`cursor-pointer`}
              onClick={(e) => handlePlus(e, PeopleType.Pet)}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: "30px",
                  color:
                    props.people.pet < 3 ? btactivateClass : btdeactivateClass,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
