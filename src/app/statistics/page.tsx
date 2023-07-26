"use client";

import type {
  StreakTradeResult,
  TradeResult,
} from "@/components/Game/gameHelpers";
import type { CryptoTicker } from "@/components/Game/gameHelpers";

import { useMemo } from "react";

import StatCardContainer from "./StatCard";
import Loader from "./Loader";

const getTokenWithMoreWins = (
  winXtoken: Map<CryptoTicker["name"], TradeResult[]>,
) => {
  let max = 0;
  let token = "";

  winXtoken.forEach((tokenTrades, tokenName) => {
    if (tokenTrades.length > max) {
      max = tokenTrades.length;
      token = tokenName;
    }
  });

  return token;
};

const getWinsForToken = (
  token: CryptoTicker["name"],
  winXtoken: Map<CryptoTicker["name"], TradeResult[]>,
) => winXtoken.get(token)?.length ?? 0;

const getPreferredPickForToken = (
  token: CryptoTicker["name"],
  winXtoken: Map<CryptoTicker["name"], TradeResult[]>,
) => {
  const higher = winXtoken
    .get(token)
    ?.filter((trade) => (trade.selection = "higher"));
  const lower = winXtoken
    .get(token)
    ?.filter((trade) => (trade.selection = "lower"));

  return higher?.length! > lower?.length!
    ? { option: "higher", amount: higher?.length }
    : { option: "lower", amount: lower?.length };
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tokenWithMoreWins = useMemo(
    () => String(getTokenWithMoreWins(winXtoken)),
    [winXtoken],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const preferredPickInTokenWithMoreWins = useMemo(
    () => getPreferredPickForToken(tokenWithMoreWins, winXtoken),
    [winXtoken, tokenWithMoreWins],
  );

  //   const streaksPerGame = splitStreakForGameID(historyTrades);

  if (!tokenWithMoreWins || !preferredPickInTokenWithMoreWins)
    return <Loader />;

  return (
    <main className="p-4">
      <h1 className=" text-dark-title text-2xl mb-6">Game statistics</h1>

      <StatCardContainer>
        <div className=" text-dark-text">
          <h2 className="font-bold text-dark-title text-2xl">Best traded</h2>
          <p className="opacity-75 text-lg">
            Asset that you perform better during streaks
          </p>
          <h2 className="text-center text-5xl my-4">
            {tokenWithMoreWins.toUpperCase()}
          </h2>
          <p className="">
            <span className="opacity-75">Succesful trades: </span>
            {getWinsForToken(tokenWithMoreWins, winXtoken)}
          </p>
          <p>
            <span className="opacity-75">Preferred pick: </span>{" "}
            {preferredPickInTokenWithMoreWins.option}{" "}
            <span>({preferredPickInTokenWithMoreWins.amount})</span>
          </p>
        </div>
      </StatCardContainer>
    </main>
  );
};

export default page;
