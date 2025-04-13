import { Fugaz_One } from "next/font/google";
import React from "react";
import Calendar from "./Calendar";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Dashboad = () => {
  const statuses: Record<string, string | number> = {
    num_days: 14,
    time_remiaining: "13:22:34",
    date: new Date().toDateString(),
  };

  const moods: Record<string, string> = {
    "&#$@!": "🤬",
    Sad: "😢",
    Exisiting: "😐",
    Happy: "😊",
    Excited: "😄",
  };

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-amber-50 text-rose-600 rounded-lg p-5 gap-4">
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex}>
            <p className="font-medium uppercase text-xs sm:text-sm truncate">
              {status.replaceAll("_", " ")}
            </p>
            <p className={"text-base sm:text-lg truncate " + fugaz.className}>
              {statuses[status]}
            </p>
          </div>
        ))}
      </div>
      <h4
        className={
          "text-4xl sm:text-5xl md:text-6xl text-center " + fugaz.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => (
          <button
            className={
              "p-2 sm:p-4 px-3 sm:px-5 orangeShadown bg-amber-50 hover:bg-amber-100 rounded-2xl duration-200 cursor-pointer flex flex-col gap-1 sm:gap-2 items-center flex-1 "
            }
            key={moodIndex}
          >
            <p className="text-3xl sm:text-5xl md:text-7xl">{moods[mood]}</p>
            <p
              className={
                "p-2 text-rose-500 text-xs sm:text-sm md:text-base " +
                fugaz.className
              }
            >
              {mood}
            </p>
          </button>
        ))}
      </div>
      <Calendar />
    </div>
  );
};

export default Dashboad;
