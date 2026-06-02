import { css, cx } from "../../../../styled-system/css";
import fullscreenSvg from "../../../assets/fullscreen.svg";
import { button } from "../../../styles/recipes";
import { useEffect, useState, useRef } from "react";
import { FullscreenManager } from "../../../utils/fullscreen";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
}

function FullScreenButton(props: Props) {
  const { containerRef } = props;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenManagerRef = useRef<FullscreenManager | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      fullscreenManagerRef.current = new FullscreenManager(containerRef.current, {
        onEnter: () => setIsFullscreen(true),
        onExit: () => setIsFullscreen(false),
        preserveAspectRatio: true
      });
    }

    return () => {
      fullscreenManagerRef.current?.destroy();
    };
  }, [containerRef]);

  const onClick = () => {
    fullscreenManagerRef.current?.toggle();
  }

  return (
    <button
      className={cx(
        button({ color: "primary" }),
        css({ width: "180px", height: "56px !important", textStyle: "20_800_100", gap: "8px" }),
      )}
      type="button"
      onClick={onClick}
    >
      <img
        className={css({ display: "inline-block" })}
        src={fullscreenSvg.src}
        alt="Full screen button icon"
        width={24}
        height={24}
      />
      <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
    </button>
  );
}

export default FullScreenButton;
