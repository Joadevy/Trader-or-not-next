"use client";

import type { StreakTradeResult } from "@/components/Game/gameHelpers";

const splitStreakForStreakID = (
  MapGameIdStreaks: Map<StreakTradeResult["gameId"], StreakTradeResult[]>,
) => {
  const streaks = new Map<
    StreakTradeResult["gameId"],
    Map<StreakTradeResult["streakId"], StreakTradeResult[]>
  >();

  Array.from(MapGameIdStreaks.values()).map((trades) => {
    trades.forEach((trade) => {
      if (streaks.has(trade.gameId)) {
        streaks.set(
          trade.gameId,
          streaks
            .get(trade.gameId)!
            .set(trade.streakId, [
              ...(streaks.get(trade.gameId)!.get(trade.streakId) ?? []),
              trade,
            ]),
        );
      } else streaks.set(trade.gameId, new Map([[trade.streakId, [trade]]]));
    });
  });

  return streaks;
};

const splitStreakForGameID = (trades: StreakTradeResult[]) => {
  const streaks = new Map<StreakTradeResult["gameId"], StreakTradeResult[]>();

  trades.forEach((trade) => {
    if (streaks.has(trade.gameId)) {
      streaks.set(trade.gameId, [...streaks.get(trade.gameId)!, trade]);
    } else streaks.set(trade.gameId, [trade]);
  });

  return splitStreakForStreakID(streaks);
};

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
      <h1 className=" text-dark-title text-2xl mb-2">
        Successful streak of trades
      </h1>
      <div className=" text-dark-text flex gap-6 flex-wrap items-center ">
        {Array.from(streaksPerGame.keys()).map((gameID, index) => (
          <div
            key={gameID}
            className="p-2 border border-dark-blue rounded-md shadow-[0_0_15px_#0B2447]"
          >
            <h2 className="font-bold">Game {index + 1}</h2>
            <div className="flex gap-4">
              {Array.from(streaksPerGame.get(gameID)!.values()).map(
                (strake, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="text-sm">Streak {index + 1}</h3>
                    <div className="flex gap-1">
                      {strake.map((trade, index) => (
                        <div
                          key={index}
                          className="border border-dark-blue-100 p-2 rounded-md bg-dark-blue"
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
