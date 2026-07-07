import { css, cx } from "../../../../styled-system/css";
import "swiper/css";
import phonePng from "../../../assets/phone.png";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperNavBtn from "../../../components/SwiperNavBtn";
import { useEffect, useMemo, useRef, useState } from "react";

const swiperNavBtnSx = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  fontSize: {base: '28px', md: '48px'},
});

const phoneFrameSx = css({
  position: "relative",
  mx: "auto",
});

const phoneImgSx = css({
  display: "block",
  width: "100%",
  height: "100%",
});

const containerSx = css({
  position: "absolute",
  overflow: "hidden",
  bgColor: "#000000"
});

const swiperSx = css({
  width: "100%",
  height: "100%",
  "& .swiper-wrapper": {
    height: "100%",
  },
  "& .swiper-slide": {
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },
});

const screenshotSx = css({
  position: "absolute",
  inset: "-1px",
  bgSize: "cover",
  bgPosition: "center",
  bgRepeat: "no-repeat",
});

export interface Props {
  screenshots: string[];
}

function ScreenshotCarousel(props: Props) {
  const { screenshots } = props;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [frameSize, setFrameSize] = useState({ width: 262, height: 538 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateFrameSize = () => {
      const width = Math.round(root.getBoundingClientRect().width * 0.75912);
      setFrameSize({
        width,
        height: Math.round((width * 854) / 416),
      });
    };

    updateFrameSize();

    const observer = new ResizeObserver(updateFrameSize);
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  const screenBox = useMemo(() => {
    const left = Math.round(frameSize.width * 0.04326);
    const right = Math.round(frameSize.width * 0.04);
    const top = Math.round(frameSize.height * 0.01639);
    const bottom = Math.round(frameSize.height * 0.01575);

    return {
      top,
      left,
      width: frameSize.width - left - right,
      height: frameSize.height - top - bottom,
      borderRadius: `${Math.round(frameSize.width * 0.11811)}px / ${Math.round(frameSize.height * 0.05461)}px`,
    };
  }, [frameSize]);

  useEffect(() => {
    let isMounted = true;

    const preloadScreenshots = async () => {
      await Promise.all(
        screenshots.map(
          (src) =>
            new Promise<void>((resolve) => {
              const image = new Image();

              image.onload = async () => {
                try {
                  await image.decode?.();
                } catch {
                  // Decoding can fail for already-loaded cross-origin images; loaded is enough here.
                }
                resolve();
              };
              image.onerror = () => resolve();
              image.src = src;
            }),
        ),
      );

      if (isMounted) {
        setIsReady(true);
      }
    };

    if (screenshots.length === 0) {
      setIsReady(true);
      return;
    }

    setIsReady(false);
    preloadScreenshots();

    return () => {
      isMounted = false;
    };
  }, [screenshots]);

  return (
    <div ref={rootRef} className={css({ position: "relative" })}>
      <div className={phoneFrameSx} style={{ width: `${frameSize.width}px`, height: `${frameSize.height}px` }}>
        <img src={phonePng.src} width={416} height={854} alt="Mobile phone frame" className={phoneImgSx} />
        <div className={containerSx} style={screenBox}>
          {isReady && (
            <SwiperContainer
              key={screenshots.join("|")}
              className={swiperSx}
              rewind
              slidesPerView={1}
              modules={[Navigation, Autoplay]}
              navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              onSwiper={(swiper) => {
                requestAnimationFrame(() => swiper.update());
              }}
            >
              {screenshots.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className={screenshotSx} role="img" aria-label={`Game screenshot ${index + 1}`} style={{ backgroundImage: `url(${img})` }} />
                </SwiperSlide>
              ))}
            </SwiperContainer>
          )}
        </div>
      </div>
      <SwiperNavBtn className={cx("prev-btn", swiperNavBtnSx, css({ left: 0 }))} />
      <SwiperNavBtn className={cx("next-btn", swiperNavBtnSx, css({ right: 0 }))} direction="right" />
    </div>
  );
}

export default ScreenshotCarousel;
