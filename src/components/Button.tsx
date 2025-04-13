import { Fugaz_One } from "next/font/google";
import React from "react";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

type Props = {
  text: string;
  dark?: boolean;
  full?: boolean;
  type?: 'submit'| 'button'| 'reset';
};

const Button = ({ text, dark, full, type }: Props) => {
  return (
    <button
      className={
        "border-2 border-solid overflow-hidden duration-200 rounded-full border-rose-600 hover:opacity-60 w-max-[100px] " +
        (dark ? " text-white bg-rose-600 " : " text-rose-600 cursor-pointer ") + 
        (full ? "w-full" : "")
      }
      type={type}
    >
      <p className={"px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 " + fugaz.className}>{text}</p>
    </button>
  );
};

export default Button;
