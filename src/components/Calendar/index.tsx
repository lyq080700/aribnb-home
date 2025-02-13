import React, { useState } from "react";
import "./index.scss";
type Props = {
  defaultValue: Date;
  onChange: (date: Date) => void;
}
function Calendar(props: Props):React.ReactElement {
  const [date, setDate] = useState(new Date(props.defaultValue));
  console.log(date.toLocaleDateString());
  // 上月
  const lastMonth = ():void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  // 下月
  const nextMonth = ():void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };
  // 获取每个月有多少天
  const daysOfMonth = (year: number, month: number):number => {
    return new Date(year, month + 1, 0).getDate();
  };
  // 获取每个月第一天是星期几
  const firstDayOfMonth = (year: number, month: number):number => {
    return new Date(year, month, 1).getDay();
  };
  const renderDays = ():Array<React.ReactElement> => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDays = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDays; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }
    for (let i = 1; i <= daysCount; i++) {
      const handelClick = () => {
        const current = new Date(date.getFullYear(), date.getMonth(), i);
        setDate(current);
        props.onChange(current);
      };
      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={() => handelClick()}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={() => handelClick()}>
            {i}
          </div>
        );
      }
    }
    return days;
  };
  return (
    <div className="grid grid-cols-2">
      <div className="calendar">
        <div className="header">
          <button onClick={lastMonth}>&lt;</button>
          <div>
            {date.getFullYear()} 年 {date.getMonth() + 1} 月
          </div>
          {/* <button onClick={nextMonth}>&gt;</button> */}
        </div>
        <div className="days">
          <div className="day">日</div>
          <div className="day">一</div>
          <div className="day">二</div>
          <div className="day">三</div>
          <div className="day">四</div>
          <div className="day">五</div>
          <div className="day">六</div>
          {renderDays()}
        </div>
      </div>
      <div className="calendar">
        <div className="header">
          {/* <button onClick={lastMonth}>&lt;</button> */}
          <div>
            {date.getFullYear()} 年 {date.getMonth() + 2} 月
          </div>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="days">
          <div className="day">日</div>
          <div className="day">一</div>
          <div className="day">二</div>
          <div className="day">三</div>
          <div className="day">四</div>
          <div className="day">五</div>
          <div className="day">六</div>
          {renderDays()}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
