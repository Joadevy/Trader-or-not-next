import React from "react";

import { TypeResult } from "../gameHelpers";

import PrizeToast from "./PrizeToast";

type Props = {
  score: number;
  isAwin: TypeResult;
};

type Trophy = {
  score: number;
  name: string;
  description: string;
  date: Date;
};

// const scoreTrophyMap: Map<Trophy['score'],Trophy[]> = new Map([]);

const addDateToTrophy = (trophy: Trophy) => {
  trophy.date = new Date(Date.now());

  return trophy;
};

const addTrophyToLocalStorage = (trophies: Trophy[], trophy: Trophy) => {
  trophy = addDateToTrophy(trophy);
  localStorage.setItem("trophies", JSON.stringify([...trophies, trophy]));
};

const getTrophy = (score: number) => {
  const trophy = fetch("./data/trophies.json")
    .then((res) => res.json())
    .then(
      (data) => data.find((trophy: Trophy) => trophy.score === score) as Trophy,
    );

  return trophy;
};

const Trophies = ({ score, isAwin }: Props) => {
  if (isAwin !== "win" || score < 1) return null;

  const trophies: Trophy[] = localStorage.getItem("trophies")
    ? JSON.parse(localStorage.getItem("trophies")!)
    : [];

  if (trophies.length === 0) {
    getTrophy(score).then((newTrophy) => {
      addTrophyToLocalStorage(trophies, newTrophy);
    });
  } else {
    const lastTrophyGained = trophies[trophies.length - 1];

    if (lastTrophyGained.score === score) return null;

    getTrophy(score).then((newTrophy) => {
      addTrophyToLocalStorage(trophies, newTrophy);
    });
  }

  return <PrizeToast score={score} />;
};

export default Trophies;
