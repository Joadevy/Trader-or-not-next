"use client";

import { useEffect, useState } from "react";

import Game from "../Game";
import HomeButton from "../Buttons/HomeButton";
import LinkButton from "../Buttons/LinkButton";

const HomeMenu = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollToSection, setScrollToSection] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const handleScrollToSection = () => {
      if (scrollToSection) {
        const section = document.getElementById("buttonsHigherLower");

        if (section) {
          const yOffset = -75;
          const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
        setScrollToSection(false);
      }
    };

    const timer = setTimeout(handleScrollToSection, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [scrollToSection]);

  const handleStartPlay = () => {
    setIsPlaying(true);
    setScrollToSection(true);
    setAnimation(true);
  };

  const backToHomeFromGame = () => {
    setIsPlaying(false);
  };

  if (isPlaying) return <Game backToHome={() => backToHomeFromGame()} />;

  return (
    <div
      className={
        "text-dark-text flex flex-col gap-3 lg:gap-2 justify-center py-2 px-4 bg-dark-bg border border-dark-bg bg-opacity-75 " +
        (animation ? "animate-slide-in-right" : "animate-fade-in")
      }
    >
      <HomeButton handleClick={() => handleStartPlay()} text="Start game" />
      <LinkButton linkTO={"/trophies"} text="My trophies" />
      <LinkButton linkTO={"/history"} text="Strake History" />
      <LinkButton linkTO={"/statistics"} text="My statistics" />
      <LinkButton linkTO={"/faq"} text="FAQ" />
    </div>
  );
};

export default HomeMenu;
