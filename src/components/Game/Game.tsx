import type {
  CryptoTicker,
  StreakTradeResult,
  TradeOptions,
  TradeResult,
  TypeResult,
} from "./gameHelpers";

import { useEffect, useRef, useState } from "react";

import BackButton from "../Buttons/BackButton";

import { getRandomCrypto, saveTradeStreakToLocalStorage } from "./gameHelpers";
import Countdown from "./Countdown";
import Result from "./Result";
import HomeInfo from "./HomeInfo";
import ButtonsTradeOptions from "./ButtonsTradeOptions";
import Trophies from "./Trophies/Trophies";

// eslint-disable-next-line import/no-unresolved
import { getPrice } from "@/utils/api/api";

type Props = {
  backToHome: () => void;
};

const Game = ({ backToHome }: Props) => {
  const gameID = useRef(crypto.randomUUID());
  const streakID = useRef(crypto.randomUUID());
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
        if (tradesInARow.length > 1) {
          streakID.current = crypto.randomUUID();
          saveTradeStreakToLocalStorage(tradesInARow);
        }
      }
      setIsActiveRound(false);
    }, 5000);
  };

  const saveTradeResult = (
    initialPrice: number,
    finalPrice: number,
    isHigher: boolean,
  ) => {
    const newTradeResult: StreakTradeResult = {
      initialPrice: initialPrice,
      finalPrice: finalPrice,
      selection: isHigher ? "higher" : "lower",
      ticker,
      date: new Date(),
      gameId: gameID.current,
      streakId: streakID.current,
    };

    const newTradesInARow = [...tradesInARow, newTradeResult];

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
    setResult(undefined);
  };

  const handleBackToHome = () => {
    if (tradesInARow.length > 1) {
      saveTradeStreakToLocalStorage(tradesInARow);
    }
    backToHome();
  };

  return (
    <main className="text-dark-text border border-dark-blue-100 p-4 rounded-lg w-[300px] lg:w-[450px] flex flex-col items-center">
      <div className="flex justify-between w-full">
        <div>
          <BackButton
            description="Back to home"
            handleClick={() => handleBackToHome()}
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
        <ButtonsTradeOptions
          higherPriceSelected={higherPriceSelected}
          shortNameTicker={ticker.shortName}
        />
      )}

      <Trophies isAwin={"win"} score={2} />
    </main>
  );
};

export default Game;
