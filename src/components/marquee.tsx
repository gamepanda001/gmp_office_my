import React, { type ReactNode } from "react";
import { css } from "../../styled-system/css";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  pauseOnHover?: boolean;
  repeat?: number;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  children,
  duration = 20,
  pauseOnHover = false,
  repeat = 4,
  direction = "left",
  className,
}: MarqueeProps) {
  const animationName = direction === "left" ? "marqueeLeft" : "marqueeRight";
  const animationDuration = duration;
  const uniqueId = React.useId().replace(/:/g, "");

  return (
    <>
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .marquee-content-${uniqueId} {
            animation: ${animationName} ${animationDuration}s linear infinite;
          }
          ${
            pauseOnHover
              ? `
            .marquee-content-${uniqueId}:hover {
              animation-play-state: paused;
            }
          `
              : ""
          }
        `}
      </style>
      <div
        className={css({
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center"
        })}
      >
        <div className={`marquee-content-${uniqueId}`} style={{ display: "flex", gap: "24px", willChange: "transform", backfaceVisibility: "hidden" }}>
          {/* First set of content */}
          <div style={{ display: "flex", gap: "24px", flexShrink: 0, backfaceVisibility: "hidden" }}>{children}</div>
          {/* Duplicate set for seamless loop */}
          <div style={{ display: "flex", gap: "24px", flexShrink: 0, backfaceVisibility: "hidden" }}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default Marquee;
