"use client";

import { useState } from "react";

import Game from "../Game";
import HomeButton from "../Buttons/HomeButton";

const HomeMenu = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(false);

  const handleStartPlay = () => {
    setIsPlaying(true);
  };

  const backToHomeFromGame = () => {
    setIsPlaying(false);
  };

  const handleOpenFAQ = () => {
    setOpenFAQ(true);
  };

  const handleCloseFAQ = () => {
    setOpenFAQ(false);
  };

  if (isPlaying) return <Game backToHome={() => backToHomeFromGame()} />;

  // if (openFAQ) return <FAQ />;

  return (
    <div className="text-dark-text flex flex-col gap-2 justify-center">
      <HomeButton handleClick={() => handleStartPlay()} text="Start game" />
      <HomeButton handleClick={() => handleOpenFAQ()} text="FAQ" />
      <HomeButton handleClick={() => handleOpenFAQ()} text="My trophies" />
    </div>
  );
};

export default HomeMenu;