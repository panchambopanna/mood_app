import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center h-75">
      <i className="fa-solid fa-spinner animate-spin text-4xl sm:text-5xl"></i>
    </div>
  );
};

export default Loading;
