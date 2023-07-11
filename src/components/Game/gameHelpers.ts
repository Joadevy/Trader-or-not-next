export type CryptoTicker = {
  symbol: string;
  name: string;
  shortName: string;
};

export type TypeResult = "win" | "lose" | "draw";

export type TradeOptions = "higher" | "lower";

export type TradeResult = {
  initialPrice: number;
  finalPrice: number;
  selection: TradeOptions;
  ticker: CryptoTicker;
  date: Date;
  gameId: string; // Para luego separar las rachas de trades por juego
};

const tickers: CryptoTicker[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", shortName: "BTC" },
  { symbol: "ETHUSDT", name: "Ethereum", shortName: "ETH" },
  { symbol: "SOLUSDT", name: "Solana", shortName: "SOL" },
  { symbol: "BNBUSDT", name: "Binance Coin", shortName: "BNB" },
  { symbol: "LTCUSDT", name: "Litecoin", shortName: "LTC" },
];

export const getRandomCrypto = () => {
  const randomIndex = Math.floor(Math.random() * tickers.length);

  return tickers[randomIndex];
};

export const saveTradeStreakToLocalStorage = (
  newTradesInARow: TradeResult[],
) => {
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
