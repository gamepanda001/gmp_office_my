import React, { useRef } from 'react';
import { css } from '../../styled-system/css';
import CoinCarousel from './CoinCarousel';
import infoSvg from '../assets/info.svg';

interface CoinCarouselRef {
  openModal: () => void;
}

const CoinCarouselWrapper: React.FC = () => {
  const coinCarouselRef = useRef<CoinCarouselRef>(null);

  const handleInfoClick = () => {
    coinCarouselRef.current?.openModal();
  };

  return (
    <div >
      <img
        src={infoSvg.src}
        alt="info"
        className={css({
          width: "24px",
          height: "24px",
          position: "absolute",
          top: "16px",
          right: "16px",
          cursor: "pointer",
          zIndex: 2,
        })}
        onClick={handleInfoClick}
      />
      <CoinCarousel ref={coinCarouselRef} />
    </div>
  );
};

export default CoinCarouselWrapper; 