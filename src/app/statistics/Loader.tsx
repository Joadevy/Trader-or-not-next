import React from "react";

import StatCardContainer from "./StatCard";

const Loader = () => {
  return (
    <main className="p-4 animate-pulse">
      <h1 className=" text-dark-title text-2xl mb-6">Game statistics</h1>

      <StatCardContainer>
        <div className=" text-dark-text">
          <div className=" bg-slate-600 h-5 w-1/2 rounded-lg" />
          <div className=" bg-slate-600 h-7 w-3/4 rounded-lg mt-2" />
          <div className="text-center text-5xl my-4 h-10 bg-slate-600 rounded-lg" />

          <div className=" bg-slate-600 h-3 w-3/4 rounded-lg mb-2" />
          <div className=" bg-slate-600 h-3 w-3/4 rounded-lg mb-2" />
        </div>
      </StatCardContainer>
    </main>
  );
};

export default Loader;
