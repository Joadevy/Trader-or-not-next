import { useEffect, useState } from "react";

import HomeButton from "../Buttons/HomeButton";
import BackButton from "../Buttons/BackButton";

import { CryptoTicker, getRandomCrypto } from "./gameHelpers";
import Countdown from "./Countdown";

// eslint-disable-next-line import/no-unresolved
import { getPrice } from "@/utils/api/api";

type Props = {
  backToHome: () => void;
};

type Result = "win" | "lose" | "draw";

const Game = ({ backToHome }: Props) => {
  const [isActiveRound, setIsActiveRound] = useState(false);
  const [score, setScore] = useState(0);
  const [ticker, setTicker] = useState<CryptoTicker>(getRandomCrypto());
  const [initialPrice, setInitialPrice] = useState<null | number>(null);
  const [finalPrice, setFinalPrice] = useState<null | number>(null);
  const [showResult, setShowResult] = useState(false);
  const [optionChosen, setOptionChosen] = useState<"higher" | "lower">();
  const [result, setResult] = useState<Result>();

  useEffect(() => {
    getPrice(ticker.symbol).then((price) => setInitialPrice(price));
  }, [ticker]);

  if (!initialPrice)
    return <div className="text-dark-blue-200">Loading...</div>;

  const higherPriceSelected = async (isHigher: boolean) => {
    setIsActiveRound(true);
    setOptionChosen(isHigher ? "higher" : "lower");
    setTimeout(async () => {
      const newPrice = await getPrice(ticker.symbol);

      setFinalPrice(newPrice);

      if (newPrice > initialPrice && isHigher) {
        setScore(score + 1);
        gameResult("win");
      } else if (newPrice < initialPrice && !isHigher) {
        setScore(score + 1);
        gameResult("win");
      } else if (newPrice === initialPrice) {
        gameResult("draw");
      } else {
        gameResult("lose");
      }
      setIsActiveRound(false);
    }, 5000);
  };

  const gameResult = (result: Result) => {
    setShowResult(true);
    setResult(result);
  };

  const playAnotherRound = () => {
    setShowResult(false);
    let newTicker = getRandomCrypto();

    while (newTicker.symbol === ticker.symbol) {
      newTicker = getRandomCrypto();
    }
    setTicker(newTicker);
  };

  // const resetGame = () => {
  //   setScore(0);
  //   setShowResult(false);
  //   setTicker(getRandomCrypto());
  // };

  return (
    <main className="text-dark-text border border-dark-blue-100 p-4 rounded-lg w-[300px] lg:w-[450px] flex flex-col items-center">
      <div className="flex justify-between w-full">
        <div>
          <BackButton
            description="Back to home"
            handleClick={() => backToHome()}
          />
        </div>
        <div className="font-bold">Score: {score}</div>
      </div>
      <header className="mb-4">
        {showResult ? (
          <>
            <h2>
              {result === "win"
                ? "You won!"
                : result === "lose"
                ? "You lost!"
                : "Oops, price didn't change, It's a draw!"}
            </h2>
            <h2>
              Cryptocurrency name:{" "}
              <span className=" text-dark-blue-300">
                {ticker.name} ({ticker.shortName})
              </span>
            </h2>
            <h3>
              Initial Price:{" "}
              <span className=" text-dark-blue-300">
                {initialPrice.toFixed(2)}
              </span>
            </h3>
            <h4>
              Final Price:{" "}
              <span className=" text-dark-blue-300">
                {finalPrice!.toFixed(2)}
              </span>
            </h4>
            <p>
              & you selected{" "}
              <span className="text-dark-blue-300">{optionChosen} price</span>
            </p>

            <div className="text-center mt-2">
              <HomeButton
                handleClick={() => playAnotherRound()}
                text="Play again"
              />
            </div>
          </>
        ) : (
          <>
            <h2>
              Cryptocurrency name:{" "}
              <span className=" text-dark-blue-300">
                {ticker.name} ({ticker.shortName})
              </span>
            </h2>
            <h3>
              Actual Price:{" "}
              <span className=" text-dark-blue-300">
                {initialPrice.toFixed(2)}
              </span>
            </h3>
          </>
        )}
      </header>
      {isActiveRound && <Countdown seconds={5} />}
      {!isActiveRound && !showResult && (
        <div className="flex gap-2 h-10">
          <HomeButton
            handleClick={() => higherPriceSelected(true)}
            text="Higher price"
          />
          <HomeButton
            handleClick={() => higherPriceSelected(false)}
            text="Lower price"
          />
        </div>
      )}
    </main>
  );
};

export default Game;
