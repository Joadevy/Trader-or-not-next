import type {
  CryptoTicker,
  StreakTradeResult,
  TradeResult,
} from "@/components/Game/gameHelpers";

export const splitStreakForStreakID = (
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

export const splitStreakForGameID = (trades: StreakTradeResult[]) => {
  const streaks = new Map<StreakTradeResult["gameId"], StreakTradeResult[]>();

  trades.forEach((trade) => {
    if (streaks.has(trade.gameId)) {
      streaks.set(trade.gameId, [...streaks.get(trade.gameId)!, trade]);
    } else streaks.set(trade.gameId, [trade]);
  });

  return splitStreakForStreakID(streaks);
};

export const getTokenWithMoreWins = (
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

  return token === "" ? "-" : token;
};

export const getWinsForToken = (
  token: CryptoTicker["name"],
  winXtoken: Map<CryptoTicker["name"], TradeResult[]>,
) => winXtoken.get(token)?.length ?? 0;

export const getPreferredPickForToken = (
  token: CryptoTicker["name"],
  winXtoken: Map<CryptoTicker["name"], TradeResult[]>,
) => {
  const higher = winXtoken
    .get(token)
    ?.filter((trade) => (trade.selection = "higher"));
  const lower = winXtoken
    .get(token)
    ?.filter((trade) => (trade.selection = "lower"));

  if (higher?.length == 0 && lower?.length == 0)
    return { option: "-", amount: 0 };

  return higher?.length! > lower?.length!
    ? { option: "higher", amount: higher?.length }
    : { option: "lower", amount: lower?.length };
};
