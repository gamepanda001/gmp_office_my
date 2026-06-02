import { css, cx } from "../../../../styled-system/css";
import "swiper/css";
import phonePng from "../../../assets/phone.png";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperNavBtn from "../../../components/SwiperNavBtn";

const swiperNavBtnSx = css({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  fontSize: {base: '28px', md: '48px'},
});

const containerSx = css({
  position: "absolute",
  top: "1.639%",
  right: "4.00%",
  bottom: "1.575%",
  left: "4.326%",
  borderRadius: "11.811% / 5.461%",
  overflow: "hidden",
  bgColor: "#000000"
});

export interface Props {
  screenshots: string[];
}

function ScreenshotCarousel(props: Props) {
  const { screenshots } = props;
  return (
    <div className={css({ position: "relative" })}>
      <div className={css({ position: "relative", mx: "auto", width: "75.912%" })}>
        <img src={phonePng.src} width={416} alt="Mobile phone frame" className={css({ width: "100%" })} />
        <div className={containerSx}>
          <SwiperContainer loop modules={[Navigation, Autoplay]} navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }} autoplay={{ delay: 3000, pauseOnMouseEnter: true }}>
            {screenshots.map((img, index) => (
              <SwiperSlide key={index}>
                <img className={css({ width: "100%", height: "100%" })} src={img} alt={`Game screenshot ${index + 1}`} />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
      </div>
      <SwiperNavBtn className={cx("prev-btn", swiperNavBtnSx, css({ left: 0 }))} />
      <SwiperNavBtn className={cx("next-btn", swiperNavBtnSx, css({ right: 0 }))} direction="right" />
    </div>
  );
}

export default ScreenshotCarousel;
