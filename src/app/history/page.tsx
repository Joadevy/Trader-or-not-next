"use client";

import type { StreakTradeResult } from "@/components/Game/gameHelpers";

// eslint-disable-next-line import/no-unresolved
import { splitStreakForGameID } from "@/utils/helpers";

const page = () => {
  let historyTrades: StreakTradeResult[] = [];

  if (typeof window !== "undefined") {
    historyTrades = localStorage.getItem("tradesInARow")
      ? (JSON.parse(
          localStorage.getItem("tradesInARow")!,
        ) as StreakTradeResult[])
      : [];
  }

  const streaksPerGame = splitStreakForGameID(historyTrades);

  return (
    <main className="p-4">
      <h1 className=" text-dark-title text-2xl mb-4 lg:mb-2">
        Successful streak of trades
      </h1>
      <div className=" text-dark-text flex gap-6 flex-wrap items-center ">
        {Array.from(streaksPerGame.keys()).map((gameID, index) => (
          <div
            key={gameID}
            className="p-2 border border-dark-blue rounded-md shadow-[0_0_15px_#0B2447] w-full sm:w-fit"
          >
            <h2 className="font-bold">Game {index + 1}</h2>
            <div className="flex flex-col gap-4 lg:flex-row">
              {Array.from(streaksPerGame.get(gameID)!.values()).map(
                (streak, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="text-sm mb-1">Streak {index + 1}</h3>
                    <div className="flex gap-2 flex-wrap lg:gap-1">
                      {streak.map((trade, index) => (
                        <div
                          key={index}
                          className="border border-dark-blue-100 p-2 rounded-md bg-dark-blue w-[150px] lg:w-fit"
                        >
                          <p>Crypto: {trade.ticker.name}</p>
                          <p>Initial price: {trade.initialPrice}</p>
                          <p>Final price: {trade.finalPrice}</p>
                          <p>
                            Selection:{" "}
                            <span
                              className={
                                trade.selection === "higher"
                                  ? "text-green-300"
                                  : "text-red-300"
                              }
                            >
                              {trade.selection} price
                            </span>
                          </p>
                          <p>{new Date(trade.date).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
