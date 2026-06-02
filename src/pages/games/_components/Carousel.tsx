import { useState } from "react";
import { css, cx } from "../../../../styled-system/css";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import type Swiper from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Thumbs, Pagination, Navigation, Autoplay } from "swiper/modules";
import { gameCarousels } from "../../../contents/games";
import { absHoriCenter, sectionContainerSx } from "../../../styles/common";
import SwiperNavBtn from "../../../components/SwiperNavBtn";
import { container, flex } from "../../../../styled-system/patterns";

const thumbCarouselSx = css(absHoriCenter, sectionContainerSx, {
  position: "absolute",
  bottom: "38px",
  zIndex: "20",
  hideBelow: "lg",
});

const thumbSx = css({
  width: "56px",
  height: "56px",
  border: "2px solid #FFFFFF",
  borderRadius: "8px",
  objectFit: "cover",
});

function Carousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | Swiper>(null);
  return (
    <div className={cx("group", css({ position: "relative" }))}>
      <div>
        <SwiperContainer
          loop
          spaceBetween={0}
          modules={[Thumbs, Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 5000 }}
          thumbs={{
            swiper: thumbsSwiper,
            slideThumbActiveClass: css({ opacity: "1 !important" }),
          }}
          breakpoints={{
            768: {
              simulateTouch: false, // 禁止鼠标模拟触摸
              allowTouchMove: false, // 禁止触摸滑动
            },
          }}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        >
          {gameCarousels.map(({ id, slug, heroImageBg, heroImageBgColor, heroImageFg, heroImageMobile }) => (
            <SwiperSlide key={id}>
              <a href={`/game/${slug}`}>
                <div className={css({ hideBelow: "md", position: "relative", height: "790px", overflow: "hidden" })}>
                  <div
                    className={css({ width: "100%", clipPath: "ellipse(1850px 517px at 50% 199px)" })}
                    style={{ backgroundColor: heroImageBgColor }}
                  >
                    <div
                      className={css({
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        minWidth: "1900px",
                        height: "720px",
                        mx: "auto",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      })}
                      style={{ backgroundImage: `url(${heroImageBg})` }}
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
                      userSelect: "none",
                    })}
                    loading="eager"
                    src={heroImageFg}
                    alt={`Game hero image for ${id}`}
                  />
                </div>
                <img
                  className={css({ hideFrom: "md", width: "100%" })}
                  src={heroImageMobile}
                  alt={`Mobile game hero image for ${id}`}
                />
              </a>
            </SwiperSlide>
          ))}
        </SwiperContainer>
        <div
          className={cx(
            container({ maxWidth: "1520px" }),
            flex({ justify: "space-between" }),
            css({
              position: "absolute",
              left: "0",
              right: "0",
              mx: "auto",
              top: "386px",
              zIndex: 999,
              hideBelow: "md",
              visibility: { base: "hidden", _groupHover: "visible" },
            }),
          )}
        >
          <SwiperNavBtn className="prev-btn" size="lg" color="translucent" />
          <SwiperNavBtn className="next-btn" direction="right" size="lg" color="translucent" />
        </div>
        <div className={thumbCarouselSx}>
          <div
            className={css({
              padding: "24px",
              width: "264px",
              borderRadius: "32px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(64px)",
            })}
          >
            <SwiperContainer
              loop
              spaceBetween={24}
              slidesPerView={3}
              freeMode
              watchSlidesProgress
              onSwiper={(swiper) => setThumbsSwiper(swiper)}
            >
              {gameCarousels.map(({ id, icon }) => (
                <SwiperSlide className={css({ opacity: 0.5, cursor: "pointer" })} key={id}>
                  <img className={thumbSx} src={icon} alt={`Thumbnail for ${id} game`} />
                </SwiperSlide>
              ))}
            </SwiperContainer>
          </div>
        </div>
      </div>
      <div className={cx("swiper-pagination", css({ hideFrom: "lg" }))} aria-label="swiper-pagination" />
    </div>
  );
}

export default Carousel;
