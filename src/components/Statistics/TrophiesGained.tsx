import type { Trophy } from "../Game/Trophies/Trophies";

import { useEffect, useState } from "react";

// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved
import Loader from "@/app/statistics/Loader";
// eslint-disable-next-line import/no-unresolved
import StatCardContainer from "@/app/statistics/StatCard";
// eslint-disable-next-line import/no-unresolved
import useTrophies from "@/hooks/useTrophies/useTrophies";

const getAmountOfTrophies = (trophies: Trophy[]) => {
  return trophies.length ?? 0;
};

const getLastTrophieEarned = (trophies: Trophy[]) => {
  return trophies[trophies.length - 1] ?? null;
};

const TrophiesEarned = () => {
  const [trophiesEarned, setTrophiesEarned] = useState<Trophy[] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.getItem("trophies")
        ? setTrophiesEarned(JSON.parse(localStorage.getItem("trophies")!) ?? [])
        : setTrophiesEarned([]);
    }
  }, []);

  const { trophies } = useTrophies();

  if (!trophiesEarned || !trophies) return <Loader />;

  return (
    <StatCardContainer>
      <div className=" text-dark-text">
        <header className="mb-2">
          <h2 className="font-bold text-dark-title text-2xl">
            Earned Trophies
          </h2>
          <p className="opacity-75 text-lg "> Amount of prizes unlocked:</p>
        </header>
        <div className="flex flex-col gap-1">
          <p className="flex flex-col items-center mb-2">
            <span className="text-5xl font-semibold text-center">
              {getAmountOfTrophies(trophiesEarned) +
                "/" +
                getAmountOfTrophies(trophies)}
            </span>
            <span className="opacity-75">trophies</span>
          </p>
          <p>
            <span className="opacity-75">Game progress: </span>
            <span>
              {Math.floor(
                (getAmountOfTrophies(trophiesEarned) /
                  getAmountOfTrophies(trophies)) *
                  100,
              ) + "%"}
            </span>
          </p>

          <p>
            <span className="opacity-75">Date of last won: </span>
            {getLastTrophieEarned(trophiesEarned) ? (
              <span>
                {new Date(
                  getLastTrophieEarned(trophiesEarned).date,
                ).toLocaleString(navigator.language ?? "es-AR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
            ) : (
              "-"
            )}
          </p>
        </div>
      </div>
    </StatCardContainer>
  );
};

export default TrophiesEarned;
