import type { StreakTradeResult } from "../Game/gameHelpers";

import { useMemo } from "react";

// eslint-disable-next-line import/no-unresolved
import Loader from "@/app/statistics/Loader";
// eslint-disable-next-line import/no-unresolved
import StatCardContainer from "@/app/statistics/StatCard";

type Props = {
  streaks: Map<
    StreakTradeResult["gameId"],
    Map<StreakTradeResult["streakId"], StreakTradeResult[]>
  >;
};

const getBestAssetInStreak = (streak: StreakTradeResult[]) => {
  const winsPerToken = new Map<string, number>();

  streak.forEach((trade) => {
    const wins = winsPerToken.get(trade.ticker.name) ?? 0;

    winsPerToken.set(trade.ticker.name, wins + 1);
  });

  let max = 0;
  let maxToken = "";

  winsPerToken.forEach((wins, token) => {
    if (wins > max) {
      max = wins;
      maxToken = token;
    }
  });

  return maxToken;
};

const getBestStreak = (
  streaks: Map<
    StreakTradeResult["gameId"],
    Map<StreakTradeResult["streakId"], StreakTradeResult[]>
  >,
) => {
  let tradesInBestStreak = 0;
  let bestStreak: StreakTradeResult[] = [];

  streaks.forEach((streak) => {
    streak.forEach((streak) => {
      if (streak.length > tradesInBestStreak) {
        bestStreak = streak;
        tradesInBestStreak = streak.length;
      }
    });
  });

  return bestStreak;
};

const BestStreak = ({ streaks }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bestStreak = useMemo(() => getBestStreak(streaks), [streaks]);

  if (bestStreak.length === 0 || !bestStreak) return <Loader />;

  return (
    <StatCardContainer>
      <div className=" text-dark-text">
        <header className="mb-2">
          <h2 className="font-bold text-dark-title text-2xl">
            Peak Performance
          </h2>
          <p className="opacity-75 text-lg ">Best streak you have ever done</p>
        </header>
        <div className="flex flex-col gap-1">
          <p className="flex flex-col items-center mb-2">
            <span className="text-5xl font-semibold text-center">
              {bestStreak.length}
            </span>
            <span className="opacity-75">succesful trades in a row</span>
          </p>
          <p>
            <span className="opacity-75">Date of the milestone: </span>
            <span>
              {bestStreak.length > 0
                ? new Date(bestStreak[0].date).toLocaleString(
                    navigator.language ?? "es-AR",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    },
                  )
                : ""}
            </span>
          </p>

          <p>
            <span className="opacity-75">Best asset in the streak: </span>
            <span>{getBestAssetInStreak(bestStreak)}</span>
          </p>
        </div>
      </div>
    </StatCardContainer>
  );
};

export default BestStreak;
