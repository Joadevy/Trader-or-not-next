import { useEffect, useState } from "react";

import HomeButton from "../Buttons/HomeButton";

import { CryptoTicker, getRandomCrypto } from "./gameHelpers";

// eslint-disable-next-line import/no-unresolved
import { getPrice } from "@/utils/api/api";

type Props = {
  backToHome: () => void;
};

const Game = ({ backToHome }: Props) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [ticker, setTicker] = useState<CryptoTicker>(getRandomCrypto());
  const [tickerPrice, setTickerPrice] = useState<null | number>(null);

  useEffect(() => {
    getPrice(ticker.symbol).then((price) => setTickerPrice(price));
  }, [ticker]);

  const backToHomeFromGame = () => {
    setIsPlaying(false);
    backToHome();
  };

  if (!tickerPrice) return <div className="text-dark-blue-200">Loading...</div>;

  const higherPriceSelected = async (isHigher: boolean) => {
    setTimeout(async () => {
      const newPrice = await getPrice(ticker.symbol);

      if (newPrice > tickerPrice && isHigher) {
        setScore(score + 1);
      } else if (newPrice < tickerPrice && !isHigher) {
        setScore(score + 1);
      }

      playAnotherRound();
    }, 5000);
  };

  const playAnotherRound = () => {
    let newTicker = getRandomCrypto();

    while (newTicker.symbol === ticker.symbol) {
      newTicker = getRandomCrypto();
    }
    setTicker(newTicker);
  };

  const playAgain = () => {
    setScore(0);
    setTicker(getRandomCrypto());
  };

  return (
    <main className="text-dark-text border border-dark-blue-100 p-4 rounded-lg">
      <div className="font-bold">Score: {score}</div>
      <header>
        <h2>
          Cryptocurrency name:{" "}
          <span className=" text-dark-blue-300">
            {ticker.name} ({ticker.shortName})
          </span>
        </h2>
        <h2>
          Actual Price:{" "}
          <span className=" text-dark-blue-300">{tickerPrice.toFixed(2)}</span>
        </h2>
      </header>
      <div className="flex gap-2 mt-5">
        <HomeButton
          handleClick={() => higherPriceSelected(true)}
          text="Higher price"
        />
        <HomeButton
          handleClick={() => higherPriceSelected(false)}
          text="Lower price"
        />
      </div>
    </main>
  );
};

export default Game;
