import { useEffect } from "react";

import BackButton from "../Buttons/BackButton";

type Props = {
  score: number;
  handleBackToHome: () => void;
  animate: boolean;
  setAnimate: (_: boolean) => void;
};

const GameLoader = ({
  score,
  handleBackToHome,
  animate,
  setAnimate,
}: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={
        "text-dark-text border bg-dark-bg border-dark-blue-100 p-4 rounded-lg h-[550px] w-full lg:w-[450px] flex flex-col items-center " +
        (animate ? "animate-fade-in" : "")
      }
    >
      <div className="flex justify-between w-full">
        <div>
          <BackButton
            description="Back to home"
            handleClick={() => handleBackToHome()}
          />
        </div>
        <div className="font-bold">Score: {score}</div>
      </div>

      <header className="mb-4 w-full animate-pulse">
        <div className="flex flex-col gap-1 mt-4">
          <div className="h-4 bg-slate-600 w-1/2 rounded-lg" />
          <div className="h-3 bg-slate-600 w-1/4 rounded-lg" />
        </div>
        <div className=" rounded-lg border border-slate-600 overflow-hidden mt-2 w-full h-[350px] flex items-center justify-center">
          <p className="text-slate-600 animate-spin text-3xl">↻</p>
        </div>
      </header>

      <div className="flex gap-2 h-10 animate-pulse">
        <button
          className="px-5 py-2.5 border border-slate-600 rounded-lg"
          type="button"
        >
          <div className="rounded-full w-5 h-5 bg-slate-600" />

          <div className="ml-1 w-[75px] lg:w-[125px]" />
        </button>

        <button
          className="px-5 py-2.5 border border-slate-600 rounded-lg"
          type="button"
        >
          <div className="rounded-full w-5 h-5 bg-slate-600" />

          <div className="ml-1 w-[75px] lg:w-[125px]" />
        </button>
      </div>
    </div>
  );
};

export default GameLoader;
