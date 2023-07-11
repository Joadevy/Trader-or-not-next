import type { TradeOptions, TypeResult, CryptoTicker } from "./gameHelpers";

import React from "react";

import HomeButton from "../Buttons/HomeButton";

type Props = {
  result: TypeResult;
  ticker: CryptoTicker;
  initialPrice: number;
  finalPrice: number;
  optionChosen: TradeOptions;
  handlePlayAgain: () => void;
};

const Result = ({
  result,
  ticker,
  initialPrice,
  finalPrice,
  optionChosen,
  handlePlayAgain,
}: Props) => {
  return (
    <>
      <h2 className="text-center">
        {result === "win" ? (
          <span className="text text-green-400 text-xl font-bold">
            You won!
          </span>
        ) : result === "lose" ? (
          <span className="text text-red-400 text-xl font-bold">
            You lost :(
          </span>
        ) : (
          "Oops, price didn't change, It's a draw!"
        )}
      </h2>
      <h2>
        Cryptocurrency name:{" "}
        <span className=" text-dark-blue-300">
          {ticker.name} ({ticker.shortName})
        </span>
      </h2>
      <h3>
        Initial Price:{" "}
        <span className=" text-dark-blue-300">{initialPrice.toFixed(2)}</span>
      </h3>
      <h4>
        Final Price:{" "}
        <span className=" text-dark-blue-300">{finalPrice!.toFixed(2)}</span>
      </h4>
      <p>
        & you selected{" "}
        <span className="text-dark-blue-300">{optionChosen} price</span>
      </p>

      <div className="text-center mt-2">
        <HomeButton handleClick={() => handlePlayAgain()} text="Play again" />
      </div>
    </>
  );
};

export default Result;
