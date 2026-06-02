import { useState, useRef, useEffect } from "react";
import { css, cx } from "../../../../styled-system/css";
import circleRightSvg from "../../../assets/circle-right.svg";
import logoSvg from "../../../assets/logo.svg";
import quitIconPng from "../../../assets/quit-icon.png";
import fscreen from "fscreen";
import GamePlayer from "./GamePlayer";
import { button } from "../../../styles/recipes";
import { fixedHoriCenter } from "../../../styles/common";
import { $isPlayMode } from "../../../store";
import { useStore } from "@nanostores/react";
import { onPlay } from "./playGame";

interface Props {
  className?: string;
  gameCode: string;
  heroImage?: string;
}

const containerSx = css({ position: "relative" });

const playerContainerSx = css(fixedHoriCenter, {
  top: "0",
  bottom: "0",
  width: "100%",
  height: "100%",
  zIndex: "100",
  opacity: "0",
  animation: "0.5s 0.1s ease forwards",
  bgColor: "#FFFFFF",
  bgPosition: "center",
  bgSize: "auto 56px",
  bgRepeat: "no-repeat",
});

function HeroBoxMobile(props: Props) {
  const { className, gameCode, heroImage } = props;
  const isPlayMode = useStore($isPlayMode);
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null);

  const onQuit = () => {
    document.body.style.overflow = "auto";
    if (fscreen.fullscreenEnabled && fscreen.fullscreenElement) {
      fscreen.exitFullscreen();
    }
    $isPlayMode.set(false);
  };

  useEffect(() => {
    if (isPlayMode && fscreen.fullscreenEnabled && fullscreenContainerRef.current && !fscreen.fullscreenElement) {
      document.body.style.overflow = "hidden";
      fscreen.requestFullscreen(fullscreenContainerRef.current);
    }
  }, [isPlayMode]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("play")) {
      onPlay();
    }
  }, []);

  return (
    <div className={cx(containerSx, className)}>
      <img className={css({ width: "100%" })} src={heroImage} alt="Game hero image for mobile view" width={750} height={836} loading="eager"/>
      <div
        ref={fullscreenContainerRef}
        className={playerContainerSx}
        style={{
          backgroundImage: `url(${logoSvg.src})`,
          visibility: isPlayMode ? "visible" : "hidden",
          animationName: isPlayMode ? "slideInBottom" : "none",
        }}
      >
        <CloseBtn onClose={onQuit} />
        {isPlayMode && <GamePlayer gameCode={gameCode} />}
      </div>
      <button
        className={cx(button({ size: "gameCta",color:'secondary' }), css(fixedHoriCenter, { bottom: "28px", zIndex: 101 }))}
        type="button"
        onClick={onPlay}
        hidden={isPlayMode}
      >
        <span>{isPlayMode ? "Quit" : "Play Now"}</span>
        <img className={css({ display: "inline-block" })} src={circleRightSvg.src} alt={isPlayMode ? "Quit game button icon" : "Play now button icon"} width={32} height={32} />
      </button>
    </div>
  );
}

export default HeroBoxMobile;

const boxSize = 38;
function CloseBtn({ onClose }: { onClose: () => void }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const touchStartPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current.x = e.touches[0].clientX - position.x;
    touchStartPos.current.y = e.touches[0].clientY - position.y;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].clientX - touchStartPos.current.x;
    const y = e.touches[0].clientY - touchStartPos.current.y;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    setPosition({
      x: getLimitedNumber({
        num: x,
        min: -20 + 10,
        max: viewportWidth - boxSize - 20 - 10,
      }),
      y: getLimitedNumber({
        num: y,
        min: -20 + 10,
        max: viewportHeight - boxSize - 20 - 10,
      }),
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        background: `url(${quitIconPng.src}) no-repeat center / 38px`,
        marginRight: "2",
        width: `${boxSize}px`,
        height: `${boxSize}px`,
        color: "#FFFFFF",
        borderRadius: "full",
        position: "fixed",
        zIndex: 3,
        top: "20px",
        left: "20px",
        transition: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    />
  );
}

function getLimitedNumber({ num, min, max }: { num: number; min: number; max: number }): number {
  if (num <= min) return min;
  if (num >= max) return max;

  return num;
}
