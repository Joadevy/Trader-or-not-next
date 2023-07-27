import type { StreakTradeResult } from "@/components/Game/gameHelpers";

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
