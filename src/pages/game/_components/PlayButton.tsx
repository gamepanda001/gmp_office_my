import { css, cx } from "../../../../styled-system/css";
import circleRightSvg from "../../../assets/circle-right.svg";
import { button } from "../../../styles/recipes";
import { $isPlayMode } from "../../../store";
import { useStore } from "@nanostores/react";
import { onPlay } from "./playGame";

interface Props {
  className?: string;
}

function PlayButton(props: Props) {
  const { className } = props;
  const isPlayMode = useStore($isPlayMode);

  const onQuit = () => {
    $isPlayMode.set(false);
  };

  const onClick = () => {
    isPlayMode ? onQuit() : onPlay();
  };

  return (
    <>
      {!isPlayMode && (
        <button className={cx(button({ size: "gameCta",color:'secondary' }), css({ width: "300px" }), className)} type="button" onClick={onClick}>
          <span>{isPlayMode ? "Quit" : "Play Now"}</span>
          <img
            className={css({ display: "inline-block" })}
            src={circleRightSvg.src}
            alt={isPlayMode ? "Quit game button icon" : "Play now button icon"}
            width={40}
            height={40}
          />
        </button>
      )}
    </>
  );
}

export default PlayButton;
