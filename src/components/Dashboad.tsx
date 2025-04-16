'use client'

import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { UserData } from "@/utils/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Dashboad = () => {
  const statuses: Record<string, string | number> = {
    num_days: 14,
    time_remiaining: "13:22:34",
    date: new Date().toDateString(),
  };

  const moods: Record<string, string> = {
    "&#$@!": "🤬",
    "Sad": "😢",
    "Exisiting": "😐",
    "Happy": "😊",
    "Excited": "😄",
  };

  const {currentUser, userDataObj, setUserDataObj} = useAuth();

  //useQeury to fetch userDataobj from the db directly here.

  const [data, setData] = useState<Record<string, number> | null>(null);

  const handleSetMood = async (mood:number): Promise<void> => {
    // mood can be set for current day only
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()
    const year = today.getFullYear();

    try {
      const newData:UserData = {...userDataObj}

    if (!newData[year]){
      newData[year] = {}
    }

    if (!newData[year][month]){
      newData[year][month] = {}
    }

    newData[year][month][day] = mood;

    setData(newData[year][month]);

    setUserDataObj(newData);

    // set data to firebase

    if (!currentUser) return;

    const docRef = doc(db, "users", currentUser?.uid);
    const res = await setDoc(docRef, newData, { merge: true });
    console.log(res);
    } catch (error) {
      console.log(error);
    }
    

  }

  useEffect(()=>{
    if(!currentUser || !userDataObj) return

    //set local state
    // set global sytate
    //set firebase


  },[currentUser,userDataObj])

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
            onClick={() => handleSetMood(moodIndex)}
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
      <Calendar data={data}/>
    </div>
  );
};

export default Dashboad;
