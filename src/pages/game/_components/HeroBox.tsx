import { useEffect, useRef } from "react";
import { css, cx } from "../../../../styled-system/css";
import logoSvg from "../../../assets/logo.svg";
import { container } from "../../../../styled-system/patterns";
import GamePlayer from "./GamePlayer";
import { absHoriCenter } from "../../../styles/common";
import { $hasLoaded, $isPlayMode } from "../../../store";
import { useStore } from "@nanostores/react";
import { onPlay } from "./playGame";
import PlayButton from "./PlayButton";
import QuitButton from "./QuitButton";
import FullScreenButton from "./FullScreenButton";

interface Props {
  className?: string;
  bgImage: string;
  bgColor: string;
  fgImage: string;
  gameCode: string;
}

const playerContainerSx = css(absHoriCenter, {
  zIndex: "10",
  top: "96px",
  width: "380px",
  height: "675px",
  borderRadius: "24px",
  overflow: "hidden",
  opacity: "0",
  animation: "0.5s 0.1s ease forwards",
  bgColor: "#FFFFFF",
  bgPosition: "center",
  bgSize: "auto 56px",
  bgRepeat: "no-repeat",
});

const buttonContainerSx = css(absHoriCenter, {
  display: "flex",
  zIndex: "1",
  top: "372px",
  width: "355px",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

function HeroBox(props: Props) {
  const { className, bgImage, bgColor, fgImage, gameCode } = props;
  const hasLoaded = useStore($hasLoaded);
  const isPlayMode = useStore($isPlayMode);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("play")) {
      onPlay();
    }
  }, []);

  useEffect(() => {
    if (isPlayMode) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isPlayMode]);

  return (
    <>
      <div
        ref={containerRef}
        className={cx(css({ position: "relative", overflow: "hidden", transition: "height 0.3s ease-in" }), className)}
        style={{ height: isPlayMode ? "884px" : "790px" }}
      >
        <div
          className={css({ width: "100%", transition: "all 0.3s ease-in" })}
          style={{ backgroundColor: bgColor, clipPath: `ellipse(1850px 517px at 50% ${isPlayMode ? 291 : 198}px)` }}
        >
          <div
            className={css({
              mx: "auto",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              minWidth: "1900px",
              height: isPlayMode ? "884px" : "720px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "height 0.3s ease-in",
            })}
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        </div>

        <img
          className={css({
            width: "1520px",
            maxWidth: "none",
            height: "680px",
            position: "absolute",
            left: "50%",
            bottom: "0",
            transform: "translateX(-50%)",
          })}
          style={{
            opacity: isPlayMode ? 0 : 1,
            filter: isPlayMode ? "blur(32px)" : "blur(0px)",
            transition: "all 0.3s ease-in",
          }}
          src={fgImage}
          alt="Game hero foreground image"
          loading="eager"
        />

        {hasLoaded && (
          <>
            <div
              className={playerContainerSx}
              ref={playerContainerRef}
              style={{
                backgroundImage: `url(${logoSvg.src})`,
                visibility: isPlayMode ? "visible" : "hidden",
                animationName: isPlayMode ? "slideInBottom" : "none",
              }}
            >
              {isPlayMode && <GamePlayer gameCode={gameCode} />}
            </div>
            {isPlayMode && (
              <div className={buttonContainerSx}>
                <QuitButton />
                <FullScreenButton containerRef={playerContainerRef} />
              </div>
            )}
          </>
        )}

        {!isPlayMode && (
          <div
            className={container({
              maxWidth: "1200px",
              boxSizing: "content-box",
              position: "absolute",
              bottom: "48px",
              left: "0",
              right: "0",
              mx: "auto",
            })}
          >
            <PlayButton />
          </div>
        )}
      </div>
    </>
  );
}

export default HeroBox;
