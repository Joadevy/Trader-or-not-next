"use client";

import type {
  StreakTradeResult,
  TradeResult,
} from "@/components/Game/gameHelpers";

import { useEffect, useMemo, useState } from "react";

// eslint-disable-next-line import/no-unresolved
import Loading from "./loading";

// eslint-disable-next-line import/no-unresolved
import { splitStreakForGameID } from "@/utils/helpers";
// eslint-disable-next-line import/no-unresolved
import NormalButton from "@/components/Buttons/NormalButton";

const getStreaksForGameID = () => {
  let historyTrades: StreakTradeResult[] = [];

  if (typeof window !== "undefined") {
    historyTrades = localStorage.getItem("tradesInARow")
      ? (JSON.parse(
          localStorage.getItem("tradesInARow")!,
        ) as StreakTradeResult[])
      : [];
  }

  return splitStreakForGameID(historyTrades);
};

const Page = () => {
  const [gamesID, setGamesID] = useState<TradeResult["gameId"][] | null>(null);
  const [gamesPerPage, setGamesPerPage] = useState(5);

  const streaksPerGame = useMemo(getStreaksForGameID, []);

  useEffect(() => {
    const gameIds = Array.from(streaksPerGame.keys()).reverse();

    setGamesID(gameIds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!gamesID) return <Loading />;

  return (
    <main className="p-4">
      <h1 className=" text-dark-title text-2xl mb-4 lg:mb-2">
        Successful streak of trades
      </h1>
      <div className=" text-dark-text flex gap-6 flex-wrap items-center mb-4">
        {gamesID.slice(0, gamesPerPage).map((gameID, index) => (
          <div
            key={gameID}
            className="p-2 border border-dark-blue rounded-md shadow-[0_0_15px_#0B2447] w-full sm:w-fit animate-fade-in"
          >
            <h2 className="font-bold">Game {gamesID.length - index}</h2>
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
                          <p>
                            {new Date(trade.date).toLocaleString(
                              navigator.language ?? "es-AR",
                            )}
                          </p>
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

      {gamesID.slice(0, gamesPerPage).length < gamesID.length && (
        <NormalButton
          handleClick={() => setGamesPerPage(gamesPerPage + 5)}
          text="Show more"
        />
      )}

      {gamesID.length === 0 && (
        <p className="text-dark-text opacity-75 text-center mt-4">
          You haven&apos;t a streak yet, keep playing!
        </p>
      )}
    </main>
  );
};

export default Page;
