import { useState } from "react";
import { css, cx } from "../../../styled-system/css";
import { aspectRatio, hstack, vstack } from "../../../styled-system/patterns";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { sortedGames } from "../../contents/games";
import SwiperNavBtn from "../../components/SwiperNavBtn";
import circleRightSvg from "../../assets/circle-right.svg";
import { button } from "../../styles/recipes";
import { debounce } from "lodash-es";

function GameCoverCarousel() {
  const [currentActiveSlug, setCurrentActiveSlug] = useState<string>("");
  const changeActive = debounce((slug: string) => setCurrentActiveSlug(slug), 420);
  return (
    <>
      <div
        className={cx(
          aspectRatio({ ratio: { base: 0.87, sm: 2.2727, md: 3.0928 } }),
          css({ maxWidth: "1732px", mx: "auto", mb: "16px" }),
        )}
      >
        <div>
          <SwiperContainer
            loop
            centeredSlides
            loopAdditionalSlides={5}
            spaceBetween={20}
            slidesPerView={5}
            slideToClickedSlide
            breakpoints={{
              0: { slidesPerView: 1.5 },
              640: { slidesPerView: 3.8 },
              768: { slidesPerView: 5 },
            }}
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
            onSlideChange={(swiper) => changeActive(sortedGames[swiper.realIndex].slug)}
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            style={{ width: "100%", height: "100%" }}
          >
            {sortedGames.map(({ id, slug, card }) => (
              <SwiperSlide key={id} className={cx("group", css({ position: "relative" }))}>
                {(slideData) => {
                  const sx = {
                    opacity: 0.3,
                    transform: "scale(.873)",
                    transformOrigin: "center",
                  };
                  if (slideData.isActive) {
                    sx.opacity = 1;
                    sx.transform = "scale(1.21)";
                  } else if (slideData.isPrev) {
                    sx.opacity = 0.6;
                    sx.transform = "translateX(-8%) scale(1.024)";
                  } else if (slideData.isNext) {
                    sx.opacity = 0.6;
                    sx.transform = "translateX(8%) scale(1.024)";
                  }

                  return (
                    <>
                      <div
                        className={cx(
                          vstack({ gap: "20px" }),
                          css({
                            position: "absolute",
                            bottom: "0",
                            left: "50%",
                            width: "400px",
                            pb: "88px",
                            zIndex: 1,
                            transform: "translateX(-50%)",
                            animation: "buttonsSlideIn .4s ease",
                            display: { base: "none", md: { _groupHover: slideData.isActive ? "flex" : "none" } },
                          }),
                        )}
                      >
                        <a href={`/game/${slug}?play=true`} className={button({ color: "secondary" })}>
                          Play Now
                          <img src={circleRightSvg.src} alt="Right arrow icon" width={32} height={32} />
                        </a>
                        <a href={`/game/${slug}/#game-info`} className={button({ color: "primary" })}>
                          Game Info
                        </a>
                      </div>
                      <img
                        className={css({
                          position: "absolute",
                          top: "0",
                          bottom: "0",
                          my: "auto",
                          transition: "transform .6s",
                          WebkitMaskImage: {
                            base: "none",
                            md: {
                              _groupHover: slideData.isActive
                                ? "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0.01%, #FFFFFF 70%)"
                                : "none",
                            },
                          },
                        })}
                        width={380}
                        height={582}
                        src={card}
                        alt={`Game cover for ${slug}`}
                        style={sx}
                      />
                    </>
                  );
                }}
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
      </div>
      <div className={hstack({ gap: "42px", justifyContent: "center", hideBelow: "md" })}>
        <SwiperNavBtn className="prev-btn" />
        <SwiperNavBtn className="next-btn" direction="right" />
      </div>

      <div className={hstack({ gap: "16px", justifyContent: "center", hideFrom: "md" })}>
        <a href={`/game/${currentActiveSlug}?play=true`} className={button({ color: "secondary", size: "sm" })}>
          Play Now
          <img src={circleRightSvg.src} alt="Right arrow icon" width={24} height={24} />
        </a>
        <a href={`/game/${currentActiveSlug}/#game-info`} className={button({ color: "primary", size: "sm" })}>
          Game Info
        </a>
      </div>
    </>
  );
}

export default GameCoverCarousel;
