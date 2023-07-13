"use client";

import { useState } from "react";
import Link from "next/link";

import Game from "../Game";
import HomeButton from "../Buttons/HomeButton";
import LinkButton from "../Buttons/LinkButton";

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
      <LinkButton linkTO={"/trophies"} text="My trophies" />
      <LinkButton linkTO={"/history"} text="Strake History" />
      <HomeButton handleClick={() => {}} text="Statistics" />
      <HomeButton handleClick={() => handleOpenFAQ()} text="FAQ" />
    </div>
  );
};

export default HomeMenu;
