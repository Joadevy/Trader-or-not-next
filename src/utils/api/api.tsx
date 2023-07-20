import type { Data } from "@/components/Game/Chart";

import { type } from "os";

import { Time } from "lightweight-charts";

export const endpoint = "https://api.binance.com/api/v3/";

export const getPrice = async (symbol: string): Promise<number> => {
  const response = await fetch(`${endpoint}ticker/price?symbol=${symbol}`);
  const data = await response.json();

  return parseFloat(data.price);
};

type HistoricalPrice = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field. Ignore.
];

export const getHistoricalPrices = async (
  symbol: string,
  interval: string,
  amountOfRegisters: number,
): Promise<Data[]> => {
  const response = await fetch(
    `${endpoint}uiKlines?symbol=${symbol}&interval=${interval}&limit=${amountOfRegisters}`,
  );
  const data: HistoricalPrice[] = await response.json();

  return data.map((item) => ({
    time: (new Date(item[0]).getTime() / 1000 -
      new Date().getTimezoneOffset() * 60) as Time,
    value: parseFloat(item[4]),
  }));
};
