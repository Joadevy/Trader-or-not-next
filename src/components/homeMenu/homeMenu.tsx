"use client";

import { useState } from "react";

import Game from "../Game";
import HomeButton from "../Buttons/HomeButton";
import LinkButton from "../Buttons/LinkButton";

const HomeMenu = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartPlay = () => {
    setIsPlaying(true);
  };

  const backToHomeFromGame = () => {
    setIsPlaying(false);
  };

  if (isPlaying) return <Game backToHome={() => backToHomeFromGame()} />;

  return (
    <div className="text-dark-text flex flex-col gap-3 lg:gap-2 justify-center">
      <HomeButton handleClick={() => handleStartPlay()} text="Start game" />
      <LinkButton linkTO={"/trophies"} text="My trophies" />
      <LinkButton linkTO={"/history"} text="Strake History" />
      <HomeButton handleClick={() => {}} text="Statistics" />
      <HomeButton handleClick={() => {}} text="FAQ" />
    </div>
  );
};

export default HomeMenu;
