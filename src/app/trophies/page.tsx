"use client";
import type { Trophy as TypeTrophy } from "@/components/Game/Trophies/Trophies";

import dynamic from "next/dynamic";

import LoaderTrophy from "./LoaderTrophy";

const Trophy = dynamic(() => import("./Trophy"), {
  ssr: false,
  loading: () => <LoaderTrophy />,
});

const checkTrophyWon = (score: number, trophies: TypeTrophy[]) => {
  if (trophies.length === 0) return false;

  return trophies.some((trophy: TypeTrophy) => trophy.score === score);
};

const page = () => {
  let trophies: TypeTrophy[] = [];

  if (typeof window !== "undefined" && window.localStorage) {
    trophies = localStorage.getItem("trophies")
      ? JSON.parse(localStorage.getItem("trophies")!) ?? []
      : [];
  }

  return (
    <main className="text-dark-text relative">
      <header className="mt-4 text-center">
        <h1 className="text-dark-title text-2xl">My trophies</h1>
      </header>
      <article className="flex flex-wrap gap-4 mt-4 items-center justify-center">
        <Trophy
          date={checkTrophyWon(1, trophies) ? trophies[0].date : undefined}
          description="Obtain 1 successful trade to unlock."
          gained={checkTrophyWon(1, trophies)}
          name="Rookie Trader Trophy"
          srcImg="/img/trophies/1TrophyIcon.webp"
        />
        <Trophy
          date={checkTrophyWon(2, trophies) ? trophies[1].date : undefined}
          description="Obtain 2 trades in a row to unlock."
          gained={checkTrophyWon(2, trophies)}
          name="Beginner Trader Trophy"
          srcImg="/img/trophies/2TrophyIcon.webp"
        />
        <Trophy
          date={checkTrophyWon(5, trophies) ? trophies[2].date : undefined}
          description="Obtain 5 trades in a row to unlock."
          gained={checkTrophyWon(5, trophies)}
          name="Advanced Trader Trophy"
          srcImg="/img/trophies/5TrophyIcon.webp"
        />
        <Trophy
          date={checkTrophyWon(7, trophies) ? trophies[3].date : undefined}
          description="Obtain 7 trades in a row to unlock."
          gained={checkTrophyWon(7, trophies)}
          name="Specialist Trader Trophy"
          srcImg="/img/trophies/7TrophyIcon.webp"
        />
        <Trophy
          date={checkTrophyWon(10, trophies) ? trophies[4].date : undefined}
          description="Obtain 10 trades in a row to unlock."
          gained={checkTrophyWon(10, trophies)}
          name="Professional Trader Trophy"
          srcImg="/img/trophies/10TrophyIcon.webp"
        />
        <Trophy
          date={checkTrophyWon(12, trophies) ? trophies[5].date : undefined}
          description="Obtain 12 trades in a row to unlock."
          gained={checkTrophyWon(12, trophies)}
          name="Master Trader Trophy"
          srcImg="/img/trophies/12TrophyIcon.webp"
        />
      </article>
    </main>
  );
};

export default page;
