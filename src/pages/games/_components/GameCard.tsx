import React from "react";
import { css, cx } from "../../../../styled-system/css";
import { aspectRatio, hstack } from "../../../../styled-system/patterns";

interface Props {
  cover: string;
  icon: string;
  title: string;
  desc: string;
  cardBgColor: string;
}

const cardRootSx = cx(
  "group",
  css({ position: "relative", overflow: "hidden", borderRadius: { base: "10px", md: "24px", lg: "32px" } }),
);

const gameIconSx = css({
  flexShrink: 0,
  width: { base: "32px", md: "48px", lg: "64px" },
  height: { base: "32px", md: "48px", lg: "64px" },
  borderRadius: "8px",
  objectFit: "cover",
  border: "1px solid rgba(255,255,255,0.5)",
});

const gameCoverSx = cx(
  aspectRatio({ ratio: 336 / 448 }),
  css({ width: "100%", transition: "transform 0.4s ease", _groupHover: { transform: "scale(1.1)" } }),
);

const infoBoxSx = cx(
  hstack({
    gap: { base: "10px", md: "12px", lg: "18px" },
  }),
  css({
    position: "absolute",
    left: { base: "6px", sm: "12px" },
    right: { base: "6px", sm: "12px" },
    bottom: { base: "8px", sm: "16px" },
    height: { base: "48px", md: "104px" },
    borderRadius: { base: "10px", md: "16px", lg: "24px" },
    backdropFilter: "blur(48px)",
    color: "white",
    px: { base: "6px", sm: "16px" },
  }),
);

const gameTitleSx = css({
  textStyle: { base: "16_700_100_Up", md: "24_700_100_Up" },
  marginBottom: { base: "0", md: "8px" },
  whiteSpace: { base: "wrap", sm: "nowrap" },
});

const gameDescSx = css({
  height: "40px",
  textStyle: "16_400_125",
  lineClamp: 2,
  _hover: { lineClamp: "none" },
});

function GameCard(props: Props) {
  const { cover, icon, title, desc, cardBgColor } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isHoverRef = React.useRef(false);

  const animateScrollTop = (end: number, duration: number) => {
    if (!ref.current) return;

    const start = ref.current.scrollTop;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      if (!ref.current) return;
      if (!isHoverRef.current) return;

      const progress = timestamp - startTime;
      const scrollValue = Math.floor((end - start) * (progress / duration));
      ref.current.scrollTop = start + scrollValue;

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const onMouseEnter = () => {
    isHoverRef.current = true;
    animateScrollTop(40, 1500);
  };

  const onMouseLeave = () => {
    isHoverRef.current = false;
    if (!ref.current) return;
    ref.current.scrollTop = 0;
  };

  return (
    <div className={cardRootSx}>
      <img src={cover} alt={title} className={gameCoverSx} />
      <div
        className={infoBoxSx}
        style={{ backgroundColor: cardBgColor }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <img src={icon} width={64} height={64} alt={`${title} game icon`} className={gameIconSx} />
        <div>
          <p className={gameTitleSx}>{title}</p>
          <div className={css({ display: { base: "none", md: "block" } })}>
            <div ref={ref} className={gameDescSx}>
              {desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
