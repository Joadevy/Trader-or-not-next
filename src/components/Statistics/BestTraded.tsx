import type { CryptoTicker, TradeResult } from "../Game/gameHelpers";

import { useEffect, useMemo, useState } from "react";

import {
  getPreferredPickForToken,
  getTokenWithMoreWins,
  getWinsForToken,
  // eslint-disable-next-line import/no-unresolved
} from "@/utils/helpers";

// eslint-disable-next-line import/no-unresolved
import Loader from "@/app/statistics/Loader";
// eslint-disable-next-line import/no-unresolved
import StatCardContainer from "@/app/statistics/StatCard";

type Props = {
  winXtoken: Map<CryptoTicker["name"], TradeResult[]>;
};

type PreferredPick = {
  option: string;
  amount?: number;
};

const BestTraded = ({ winXtoken }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const tokenWithMoreWins = useMemo(
    () => String(getTokenWithMoreWins(winXtoken)),
    [winXtoken],
  );

  const preferredPickInTokenWithMoreWins = useMemo(
    () => getPreferredPickForToken(tokenWithMoreWins, winXtoken),
    [winXtoken, tokenWithMoreWins],
  );

  useEffect(() => {
    if (tokenWithMoreWins && preferredPickInTokenWithMoreWins) {
      setIsLoading(false);
    }
  }, [tokenWithMoreWins, preferredPickInTokenWithMoreWins]);

  if (isLoading) return <Loader />;

  return (
    <StatCardContainer>
      <div className=" text-dark-text">
        <h2 className="font-bold text-dark-title text-2xl">
          Best asset traded
        </h2>
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
  );
};

export default BestTraded;
