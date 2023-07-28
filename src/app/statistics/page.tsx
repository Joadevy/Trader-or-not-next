"use client";

import type {
  StreakTradeResult,
  TradeResult,
} from "@/components/Game/gameHelpers";
import type { CryptoTicker } from "@/components/Game/gameHelpers";

import { useMemo } from "react";

import // eslint-disable-next-line import/no-unresolved
"@/utils/helpers";

// eslint-disable-next-line import/no-unresolved
import BestTraded from "@/components/Statistics/BestTraded";

const page = () => {
  let historyTrades: StreakTradeResult[] = [];

  if (typeof window !== "undefined") {
    historyTrades = localStorage.getItem("tradesInARow")
      ? (JSON.parse(
          localStorage.getItem("tradesInARow")!,
        ) as StreakTradeResult[])
      : [];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const winXtoken: Map<CryptoTicker["name"], TradeResult[]> = useMemo(() => {
    return new Map<CryptoTicker["name"], TradeResult[]>();
  }, []);

  historyTrades.forEach((trade) => {
    winXtoken.set(trade.ticker.name, [
      ...(winXtoken.get(trade.ticker.name) ?? []),
      trade,
    ]);
  });

  // const streaksPerGame = splitStreakForGameID(historyTrades);

  return (
    <main className="p-4">
      <h1 className=" text-dark-title text-2xl mb-6">Game statistics</h1>

      <BestTraded winXtoken={winXtoken} />
    </main>
  );
};

export default page;
