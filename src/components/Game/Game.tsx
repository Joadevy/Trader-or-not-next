import type {
  CryptoTicker,
  TradeOptions,
  TradeResult,
  TypeResult,
} from "./gameHelpers";

import { useEffect, useRef, useState } from "react";

import BackButton from "../Buttons/BackButton";

import { getRandomCrypto } from "./gameHelpers";
import Countdown from "./Countdown";
// eslint-disable-next-line import/no-unresolved
import PrizeToast from "./PrizeToast";
// eslint-disable-next-line import/no-unresolved
import Result from "./Result";
// eslint-disable-next-line import/no-unresolved
import HomeInfo from "./HomeInfo";
// eslint-disable-next-line import/no-unresolved
import ButtonsTradeOptions from "./ButtonsTradeOptions";

// eslint-disable-next-line import/no-unresolved
import { getPrice } from "@/utils/api/api";

type Props = {
  backToHome: () => void;
};

const saveTradeStreakToLocalStorage = (newTradesInARow: TradeResult[]) => {
  if (newTradesInARow.length > 1 && !localStorage.getItem("tradesInARow")) {
    localStorage.setItem("tradesInARow", JSON.stringify(newTradesInARow));
  } else if (newTradesInARow.length > 1) {
    const tradesInARow = JSON.parse(
      localStorage.getItem("tradesInARow")!,
    ) as TradeResult[];

    localStorage.setItem(
      "tradesInARow",
      JSON.stringify(tradesInARow.concat(newTradesInARow)),
    );
  }
};

const Game = ({ backToHome }: Props) => {
  const gameID = useRef(crypto.randomUUID());
  const [isActiveRound, setIsActiveRound] = useState(false);
  const [score, setScore] = useState(0);
  const [ticker, setTicker] = useState<CryptoTicker>(getRandomCrypto());
  const [initialPrice, setInitialPrice] = useState<null | number>(null);
  const [finalPrice, setFinalPrice] = useState<null | number>(null);
  const [showResult, setShowResult] = useState(false);
  const [optionChosen, setOptionChosen] = useState<TradeOptions>();
  const [result, setResult] = useState<TypeResult>();
  const [tradesInARow, setTradesInARow] = useState<TradeResult[]>([]);

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

      if (
        (newPrice > initialPrice && isHigher) ||
        (newPrice < initialPrice && !isHigher)
      ) {
        setScore(score + 1);
        gameResult("win");
        saveTradeResult(initialPrice, newPrice, isHigher);
      } else if (newPrice === initialPrice) {
        gameResult("draw");
      } else {
        gameResult("lose");
        setScore(0);
        setTradesInARow([]);
      }
      setIsActiveRound(false);
    }, 5000);
  };

  const saveTradeResult = (
    initialPrice: number,
    finalPrice: number,
    isHigher: boolean,
  ) => {
    const newTradeResult: TradeResult = {
      initialPrice: initialPrice,
      finalPrice: finalPrice,
      selection: isHigher ? "higher" : "lower",
      ticker,
      date: new Date(),
      gameId: gameID.current,
    };

    const newTradesInARow = [...tradesInARow, newTradeResult];

    saveTradeStreakToLocalStorage(newTradesInARow);

    setTradesInARow(newTradesInARow);
  };

  const gameResult = (result: TypeResult) => {
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
    setInitialPrice(null);
  };

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
            <Result
              finalPrice={finalPrice!}
              handlePlayAgain={playAnotherRound}
              initialPrice={initialPrice}
              optionChosen={optionChosen!}
              result={result!}
              ticker={ticker}
            />
          </>
        ) : (
          <HomeInfo initialPrice={initialPrice} ticker={ticker} />
        )}
      </header>
      {isActiveRound && <Countdown seconds={5} />}
      {!isActiveRound && !showResult && (
        <ButtonsTradeOptions higherPriceSelected={higherPriceSelected} />
      )}

      <PrizeToast score={score} />
    </main>
  );
};

export default Game;
