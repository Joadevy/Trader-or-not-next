"use client";

import type { TradeResult } from "@/components/Game/gameHelpers";

const splitStreakForGameID = (trades: TradeResult[]) => {
  const streaks = new Map<TradeResult["gameId"], TradeResult[]>();

  trades.forEach((trade) => {
    if (streaks.has(trade.gameId)) {
      streaks.set(trade.gameId, [...streaks.get(trade.gameId)!, trade]);
    } else streaks.set(trade.gameId, [trade]);
  });

  return streaks;
};

const page = () => {
  const historyTrades = localStorage.getItem("tradesInARow")
    ? (JSON.parse(localStorage.getItem("tradesInARow")!) as TradeResult[])
    : [];

  const streaks = splitStreakForGameID(historyTrades);

  return (
    <main className="p-4">
      <h1 className=" text-dark-title text-2xl mb-2">
        Successful streak of trades
      </h1>
      <div className=" text-dark-text flex gap-6 flex-wrap">
        {Array.from(splitStreakForGameID(historyTrades).keys()).map(
          (gameID, index) => (
            <div
              key={gameID}
              className="border border-dark-blue-100 p-2 rounded-md"
            >
              <h2>Game {index + 1}</h2>
              <div className="flex gap-2">
                {streaks.get(gameID)?.map((trade, index) => (
                  <div
                    key={index}
                    className="border border-dark-blue-200 p-2 rounded-md bg-dark-blue-100"
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
    </main>
  );
};

export default page;
