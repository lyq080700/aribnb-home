"use client";
import Item from "./item";
import Card from "../CardContainer";
import ImageRatio from "../ImageRatio";
import { useDispatch } from "react-redux";
import { setParams } from "@/store/searchStore";
import { useSelector } from "react-redux";
type AddressProps = {
  addressClass: string;
  handleAddress: () => void;
  location: string;
}
type AddressOptionsProps = {
  addressActive: boolean;
  setLocation: (value: string) => void;
  isMobile: boolean;
}
export default function Address(props:AddressProps&AddressOptionsProps) {
  const dispatch = useDispatch();
  const searchParams = useSelector((state) => state.searchParams);
  return (
    <div className="relative address" onClick={props.handleAddress}>
      <Item
        title="地点"
        placholder="搜索目的地"
        className={props.addressClass}
        inputNeed={true}
        value={props.location}
        setValue={(value: string) => {
          props.setLocation(value);
          dispatch(
            setParams({
              ...searchParams,
              address: { city: value, country: "" },
            })
          );
        }}
      />
      <div className="search-divider"></div>
      <AddressOptions
        addressActive={props.addressActive}
        setLocation={props.setLocation}
        isMobile={props.isMobile}
      />
    </div>
  );
}

type Region={
  name: string;
  value: string;
  img: string;
}
type City={
  name: string;
  value: string;
}

function AddressOptions(props:AddressOptionsProps) {
  const searchParams = useSelector((state) => state.searchParams);
  const dispatch = useDispatch();
  const regionData:Array<Region> = [
    {
      name: "随便看看",
      value: "any",
      img: "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg",
    },
    {
      name: "欧洲",
      value: "europe",
      img: "https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg",
    },
    {
      name: "日本",
      value: "japan",
      img: "https://a0.muscache.com/im/pictures/26891a81-b9db-4a9c-8aab-63486b7e627c.jpg",
    },
    {
      name: "东南亚",
      value: "southeast-asia",
      img: "https://a0.muscache.com/im/pictures/d77de9f5-5318-4571-88c7-e97d2355d20a.jpg",
    },
  ];

  const cityData:Array<City> = [
    { name: "曼谷", value: "bangkok" },
    { name: "巴黎", value: "paris" },
    { name: "伦敦", value: "london" },
    { name: "新加坡", value: "singapore" },
    { name: "东京", value: "tokyo" },
    { name: "首尔", value: "seoul" },
    { name: "纽约", value: "new-york" },
    { name: "香港", value: "hong-kong" },
  ];
  //地址选择
  const handleRegion = (value: Region) => {
    props.setLocation(value.name);
    let country = value.value === "any" ? "" : value.value;
    dispatch(
      setParams({
        ...searchParams,
        address: { city: "", country: country },
      })
    );
  };
  const handleCity = (value: City) => {
    props.setLocation(value.name);
    dispatch(
      setParams({
        ...searchParams,
        address: { city: value.value, country: "" },
      })
    );
  };

  return (
    <Card
      className={`address-options  max-h-[400px] xl:max-h-[500px] ${
        props.addressActive ? "visible" : "invisible"
      } ${props.isMobile ? "min-w-[320px]" : "min-w-[430px]"}`}
    >
      <div
        className={`overflow-y-auto overflow-x-hidden ${
          props.isMobile ? "" : "px-4 pb-6"
        }`}
      >
        <div className="country">
          <div className="title text-[14px] font-bold mb-3 ml-3">
            按地区搜索
          </div>
          <div className="country-options grid grid-cols-4">
            {regionData.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={(e) => handleRegion(item, e)}
              >
                <div className="item rounded-xl hover:bg-[#EBEBEB] p-3">
                  <ImageRatio
                    src={item.img}
                    alt={item.name}
                    ratio="100%"
                    className={`border border-solid border-[#ddd] ${
                      props.isMobile
                        ? "h-[50px] rounded-lg"
                        : "h-[81px] rounded-xl"
                    }`}
                  />
                  <div
                    className={`text-[#222] mt-1 ${
                      props.isMobile
                        ? "text-[12px] text-center"
                        : "text-[14px] "
                    }`}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="recommand">
          <div className="title text-[14px] font-bold ml-3 mt-6 mb-3">
            为你推荐
          </div>
          <div className="recommand-options grid grid-cols-4">
            {cityData.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer border border-solid border-[#ddd] text-center hover:border-[#222] m-1 ${
                  props.isMobile
                    ? "rounded-[18px] py-2 px-2"
                    : "rounded-[26px] py-2 px-5"
                }`}
                onClick={(e) => handleCity(item, e)}
              >
                <div
                  className={`text-[#222] mt-1 ${
                    props.isMobile ? "text-[12px] text-center" : "text-[14px] "
                  }`}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="options"></div>
      </div>
    </Card>
  );
}
