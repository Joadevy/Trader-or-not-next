import type { CryptoTicker, TradeResult } from "../Game/gameHelpers";

import { useMemo } from "react";

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

const BestTraded = ({ winXtoken }: Props) => {
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

  if (!tokenWithMoreWins || !preferredPickInTokenWithMoreWins)
    return <Loader />;

  return (
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
  );
};

export default BestTraded;
