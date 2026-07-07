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

const phoneFrameSx = css({
  position: "relative",
  mx: "auto",
  width: "75.912%",
  aspectRatio: "416 / 854",
});

const phoneImgSx = css({
  display: "block",
  width: "100%",
  height: "100%",
});

const containerSx = css({
  position: "absolute",
  top: "1.639%",
  left: "4.326%",
  width: "91.674%",
  height: "96.786%",
  borderRadius: "11.811% / 5.461%",
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
    height: "100%",
    overflow: "hidden",
  },
});

const screenshotSx = css({
  width: "100%",
  height: "100%",
  bgSize: "cover",
  bgPosition: "center",
  bgRepeat: "no-repeat",
});

export interface Props {
  screenshots: string[];
}

function ScreenshotCarousel(props: Props) {
  const { screenshots } = props;
  return (
    <div className={css({ position: "relative" })}>
      <div className={phoneFrameSx}>
        <img src={phonePng.src} width={416} height={854} alt="Mobile phone frame" className={phoneImgSx} />
        <div className={containerSx}>
          <SwiperContainer className={swiperSx} loop modules={[Navigation, Autoplay]} navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }} autoplay={{ delay: 3000, pauseOnMouseEnter: true }}>
            {screenshots.map((img, index) => (
              <SwiperSlide key={index}>
                <div className={screenshotSx} role="img" aria-label={`Game screenshot ${index + 1}`} style={{ backgroundImage: `url(${img})` }} />
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
