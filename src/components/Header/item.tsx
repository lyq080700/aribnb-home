"use client";
import React, { useState } from "react";
import { DatePicker, ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
const { RangePicker } = DatePicker;
type ItemProps = {
  title: string;
  placholder: string;
  className?: string;
  inputNeed?: boolean;
  value: string;
  setValue?: (value:string|string[],date?: Date) => void;
}
export default function Item({
  title,
  placholder,
  className,
  inputNeed,
  value,
  setValue,
}:ItemProps):React.ReactElement {
  return (
    <div
      className={`px-6 py-3 cursor-pointer hover:bg-[#EBEBEB] hover:rounded-[32px] ${className}`}
    >
      <div className="text-[12px] text-[#222] pb-[2px]">{title}</div>
      {inputNeed ? (
        <input
          className="text-[14px] border-none bg-transparent outline-none text-ellipsis"
          placeholder={placholder}
          type="text"
          value={value}
          onChange={(e) => setValue?.(e.target.value)}
        />
      ) : title === "日期" ? (
        <ConfigProvider locale={locale}>
          <RangePicker
            placeholder={[placholder, placholder]}
            suffixIcon=""
            onChange={setValue}
          />
        </ConfigProvider>
      ) : (
        <span
          className={`text-[14px] text-ellipsis ${
            value ? "text-[#222]" : "text-[#999]"
          }`}
        >
          {value ? value : placholder}
        </span>
      )}
    </div>
  );
}
