import React from "react";

const Loading = () => {
  return (
    <div className=" text-dark-text min-h-screen grid place-content-center animate-pulse">
      <p className="animate-spin opacity-50 text-3xl relative">↻</p>
    </div>
  );
};

export default Loading;
