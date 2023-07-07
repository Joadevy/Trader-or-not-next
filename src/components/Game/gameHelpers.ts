export type CryptoTicker = {
  symbol: string;
  name: string;
  shortName: string;
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
