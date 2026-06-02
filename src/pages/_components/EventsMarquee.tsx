import { Marquee } from "../../components/marquee";
import MaskGroup from "../../assets/events/Mask group.png";
import MaskGroup1 from "../../assets/events/Mask group-1.png";
import MaskGroup2 from "../../assets/events/Mask group-2.png";
import MaskGroup3 from "../../assets/events/Mask group-3.png";
import MaskGroup4 from "../../assets/events/Mask group-4.png";
import MaskGroup5 from "../../assets/events/Mask group-5.png";
import MaskGroup6 from "../../assets/events/Mask group-6.png";
import MaskGroup7 from "../../assets/events/Mask group-7.png";
import MaskGroup8 from "../../assets/events/Mask group-8.png";
import MaskGroup9 from "../../assets/events/Mask group-9.png";
import MaskGroup10 from "../../assets/events/Mask group-10.png";
import MaskGroup11 from "../../assets/events/Mask group-11.png";
import MaskGroup12 from "../../assets/events/Mask group-12.png";
import MaskGroup13 from "../../assets/events/Mask group-13.png";
import MaskGroup14 from "../../assets/events/Mask group-14.png";
import MaskGroup15 from "../../assets/events/Mask group-15.png";
import MaskGroup16 from "../../assets/events/Mask group-16.png";

import { css } from "../../../styled-system/css";
import leftCover from "../../assets/events/left_cover.png";
import rightCover from "../../assets/events/right_cover.png";

const list = [
  MaskGroup,
  MaskGroup1,
  MaskGroup2,
  MaskGroup3,
  MaskGroup4,
  MaskGroup5,
  MaskGroup6,
  MaskGroup7,
  MaskGroup8,
  MaskGroup9,
  MaskGroup10,
  MaskGroup11,
  MaskGroup12,
  MaskGroup13,
  MaskGroup14,
  MaskGroup15,
  MaskGroup16,
];

export function EventsMarquee() {
  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        position: "relative",
      })}
    >
      <img
        src={leftCover.src}
        className={css({
          position: "absolute",
          width: {
            base: "72px",
            md: "128px",
          },
          height: "full",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: 2,
        })}
      />
      <Marquee pauseOnHover duration={50} repeat={3}>
        {list.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt=""
            className={css({
              width: {
                md: "368px",
                base: "230px",
              },
              height: {
                base: "173px",
                md: "276px",
              },
              minWidth: {
                md: "368px",
                base: "230px",
              },
              maxWidth: {
                md: "368px",
                base: "230px",
              },
              objectFit: "cover",
              flexShrink: 0,
              flexGrow: 0,
              flexBasis: "auto",
              display: "block",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              position: "relative",
            })}
          />
        ))}
      </Marquee>

      <Marquee pauseOnHover duration={50} repeat={3} direction="right">
        {[...list].reverse().map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt=""
            className={css({
              width: {
                md: "368px",
                base: "230px",
              },
              height: {
                base: "173px",
                md: "276px",
              },
              minWidth: {
                md: "368px",
                base: "230px",
              },
              maxWidth: {
                md: "368px",
                base: "230px",
              },
              objectFit: "cover",
              flexShrink: 0,
              flexGrow: 0,
              flexBasis: "auto",
              display: "block",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              position: "relative",
            })}
          />
        ))}
      </Marquee>
      <img
        src={rightCover.src}
        className={css({
          position: "absolute",
          width: {
            base: "72px",
            md: "128px",
          },
          height: "full",
          top: 0,
          right: 0,
          objectFit: "cover",
        })}
      />
    </div>
  );
}
