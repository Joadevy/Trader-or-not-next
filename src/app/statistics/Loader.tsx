import React from "react";

import StatCardContainer from "./StatCard";

const Loader = () => {
  return (
    <StatCardContainer>
      <div className=" text-dark-text animate-pulse">
        <div className=" bg-slate-600 h-5 w-1/2 rounded-lg" />
        <div className=" bg-slate-600 h-7 w-3/4 rounded-lg mt-2" />
        <div className="text-center text-5xl my-4 h-10 bg-slate-600 rounded-lg" />

        <div className=" bg-slate-600 h-3 w-3/4 rounded-lg mb-2" />
        <div className=" bg-slate-600 h-3 w-3/4 rounded-lg mb-2" />
      </div>
    </StatCardContainer>
  );
};

export default Loader;
