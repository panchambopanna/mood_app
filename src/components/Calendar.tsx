"use client";

import React, { useState } from "react";
import { baseRating, gradients, months, daysList } from "@/utils";
import { Fugaz_One } from "next/font/google";
import { UserData } from "@/utils/types";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

type Props = {
  demo?: boolean;
  data: UserData | null;
};

const Calendar = ({ demo, data }: Props) => {
  const now = new Date();
  const currMonth = now.getMonth();
  const [month, setMonth] = useState(Object.keys(months)[currMonth]);
  const [year, setYear] = useState(now.getFullYear());

  const numericMonth = Object.keys(months).indexOf(month);
  const completedData = data?.[year]?.[numericMonth] ?? {};
  const monthsArr = Object.keys(months);

  const handleMonthChange = (val: number): void => {
    // increment or decrement the month
    // if we hit the bounds of month then increment or decrement the year
    if (numericMonth + val < 0) {
      setYear((prev) => prev - 1);
      setMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      setYear((prev) => prev + 1);
      setMonth(monthsArr[0]);
    } else {
      setMonth(monthsArr[numericMonth + val]);
    }
  };

  const handleToday = (): void => {
    setYear(now.getFullYear());
    setMonth(Object.keys(months)[now.getMonth()]);
  };

  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    year,
    Object.keys(months).indexOf(month) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;

  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-5">
        <button
          className="mr-auto text-rose-400 cursor-pointer text-lg sm:text-xl duration-200 hover:opacity-60"
          onClick={() => handleMonthChange(-1)}
        >
          <i className="fa-solid fa-circle-chevron-left" />
        </button>
        <div className="flex gap-3 justify-center items-center">
          <p
            className={
              "text-center capitlize textGradient text-sm sm:text-xl " +
              fugaz.className
            }
          >
            {month}, <span className="text-xs sm:text-md">{year}</span>
          </p>
          <button title="This month" onClick={() => handleToday()}>
            <i className="fa-solid fa-calendar-day text-sm sm:text-xl duration-200 hover:opacity-60 cursor-pointer text-rose-500"></i>
          </button>
        </div>
        <button
          className="ml-auto text-rose-400 cursor-pointer text-lg sm:text-xl duration-200 hover:opacity-60"
          onClick={() => handleMonthChange(+1)}
        >
          <i className="fa-solid fa-circle-chevron-right" />
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1">
        {[...Array(numRows).keys()].map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {daysList.map((dayOfWeek, dayOfWeekIndex) => {
              const dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

              const dayDisplay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayOfWeekIndex < firstDayOfMonth
                  ? false
                  : true;

              const isToday = dayIndex === now.getDate();

              if (!dayDisplay) {
                return <div key={dayOfWeekIndex} />;
              }

              const color = demo
                ? gradients.rose[baseRating[dayIndex]]
                : completedData && dayIndex in completedData
                ? gradients.rose[completedData[dayIndex]]
                : "white";

              return (
                <div
                  style={{ background: color }}
                  className={
                    "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                    (isToday
                      ? " border-rose-500 border-2"
                      : " border-rose-100 ") +
                    (color === "white"
                      ? " text-rose-400 "
                      : " text-white font-bold ")
                  }
                  key={dayOfWeekIndex}
                >
                  {dayIndex}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
