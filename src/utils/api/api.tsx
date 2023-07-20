import type { Data } from "@/components/Game/Chart";

import { type } from "os";

export const endpoint = "https://api.binance.com/api/v3/";

export const getPrice = async (symbol: string): Promise<number> => {
  const response = await fetch(`${endpoint}ticker/price?symbol=${symbol}`);
  const data = await response.json();

  return parseFloat(data.price);
};

// Example return array data = [
//   1499040000000, // Kline open time
//   "0.01634790", // Open price
//   "0.80000000", // High price
//   "0.01575800", // Low price
//   "0.01577100", // Close price
//   "148976.11427815", // Volume
//   1499644799999, // Kline Close time
//   "2434.19055334", // Quote asset volume
//   308, // Number of trades
//   "1756.87402397", // Taker buy base asset volume
//   "28.46694368", // Taker buy quote asset volume
//   "0", // Unused field, ignore.
// ];

type HistoricalPrice = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field, ignore.
];

export const getHistoricalPrices = async (
  symbol: string,
  interval: string,
  amountOfRegisters: number,
): Promise<Data[]> => {
  const response = await fetch(
    `${endpoint}klines?symbol=${symbol}&interval=${interval}&limit=${amountOfRegisters}}`,
  );
  const data: HistoricalPrice[] = await response.json();

  console.log(data);

  return data.map((item) => ({
    time: new Date(item[0]).toLocaleTimeString(),
    value: parseFloat(item[4]),
  }));
};
