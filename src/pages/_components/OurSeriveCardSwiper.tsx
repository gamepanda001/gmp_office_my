import { css } from "../../../styled-system/css";
import "swiper/css";
import "swiper/css/thumbs";
import 'swiper/css/pagination';
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type React from "react";
import { vstack } from "../../../styled-system/patterns";

const cardStyle = {
  bgColor: "#FFFFFF",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #E5E5E5",
}

interface Props {
  children?: React.ReactNode;
  gameCard?: React.ReactNode;
  countriesCard?: React.ReactNode;
  currenciesCard?: React.ReactNode;
  coinsCard?: React.ReactNode;
  licensesCard?: React.ReactNode;
  accountManaSupportCard?: React.ReactNode;
}

function OurSeriveCardSwiper(props: Props) {
  return (
    <>
      <SwiperContainer
        loop
        spaceBetween={24}
        slidesPerView={1.1574}
        modules={[Pagination]}
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        style={{ width: "100%", paddingLeft: '24px' }}
      >
        <SwiperSlide style={{ height: '388px' }}>
          <div className={css(cardStyle, { height: '100%' })}>
            {props.gameCard}
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: '388px' }}>
          <div className={css(cardStyle, { height: '100%' })}>
            {props.countriesCard}
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: '388px' }}>
          <div className={css(cardStyle, { height: '100%' })}>
            {props.currenciesCard}
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: '388px' }}>
          <div className={vstack({ height: '100%', gap: '12px', alignItems: 'stretch' })}>
            <div className={css(cardStyle, { flex: 1 })}>
              {props.coinsCard}
            </div>
            <div className={css(cardStyle)}>
              {props.licensesCard}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ height: '388px' }}>
          <div className={css(cardStyle, { height: '100%' })}>
            {props.accountManaSupportCard}
          </div>
        </SwiperSlide>
      </SwiperContainer>
      <div className="swiper-pagination" aria-label='swiper-pagination'/>
    </>
  );
}

export default OurSeriveCardSwiper;
