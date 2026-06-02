import React, { useState, useEffect, useRef, useCallback, useImperativeHandle } from 'react';
import { css, cx } from '../../styled-system/css';
import { hstack } from '../../styled-system/patterns';
import coinList from '../contents/coins';
import CurrencyModal from './CurrencyModal';
import CoinItem from './CoinItem';
import goldCoinSvg from '../assets/gold-coin.svg';


interface CoinCarouselRef {
  openModal: () => void;
}

interface CoinCarouselProps {
  className?: string;
}

const coinWidth = 56;
const coinGap = 14;
const coinsPerView = 4;
const windowWidth = (coinWidth + coinGap) * coinsPerView;
const initX = -coinWidth / 2;
const step = coinWidth + coinGap;


const maskSx = {
  content: "''",
  position: "absolute" as const,
  top: "0",
  bottom: "0",
  zIndex: 1,
  width: "36px",
};

const windowSx = css({
  height: "72px",
  overflow: "hidden",
  position: "relative",
  width: `${windowWidth}px`,
  userSelect: "none",
  _before: {
    ...maskSx,
    left: "0",
    background: "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
  },
  _after: {
    ...maskSx,
    right: "0",
    background: "linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
  },
});

const listSx = cx(
  css({
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    my: "auto",
    transform: `translateX(${initX}px)`,
  }),
  hstack({ gap: "12px", flexWrap: "nowrap" })
);

const coinSx = css({
  width: `${coinWidth}px`,
  height: `${coinWidth}px`,
  textTransform: "uppercase",
  fontWeight: 900,
  opacity: 0.5,
  cursor: "pointer",
  transition: "all 600ms ease",
  "&.actived": {
    opacity: 1,
    transform: "scale(1.2)",
  },
});

const CoinCarousel = React.forwardRef<CoinCarouselRef, CoinCarouselProps>(({ className }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coins, setCoins] = useState(coinList);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 动画缓动函数
  const easeInOutCubic = useCallback((t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }, []);

  // 移动动画
  const move = useCallback(() => {
    if (!listRef.current) return;

    const duration = 400; // 动画持续时间(ms)
    let start: number;
    const listElement = listRef.current;

    // 移除当前激活状态
    const activeElement = listElement.querySelector('.actived');
    if (activeElement) {
      activeElement.classList.remove('actived');
    }

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = (timestamp - start) / duration;
      
      if (elapsed < 1) {
        const easedProgress = easeInOutCubic(elapsed);
        listElement.style.transform = `translateX(${initX - Math.min(easedProgress, 1) * step}px)`;
        requestAnimationFrame(animate);
      } else {
        // 动画结束，重新排列元素
        const firstChild = listElement.firstElementChild;
        if (firstChild) {
          listElement.appendChild(firstChild);
          listElement.style.transform = `translateX(${initX}px)`;
          
          // 标记新的中间元素为激活状态
          const middleElement = listElement.children[2];
          if (middleElement) {
            middleElement.classList.add('actived');
          }
        }
      }
    };

    requestAnimationFrame(animate);
  }, [easeInOutCubic]);

  // 开始轮播
  const startCarousel = useCallback(() => {
    if (!intervalRef.current) {
      move(); // 立即执行一次
      intervalRef.current = setInterval(move, 3000);
    }
  }, [move]);

  // 停止轮播
  const stopCarousel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 处理点击事件
  const handleCoinClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // 关闭模态框
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 暴露一个方法，点击info图标时，打开模态框
  const handleInfoClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      openModal: handleInfoClick
    }),
    [handleInfoClick],
  )

  // 设置 Intersection Observer
  useEffect(() => {
    if (!listRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            startCarousel();
          } else if (!entry.isIntersecting && isVisible) {
            setIsVisible(false);
            stopCarousel();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(listRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isVisible, startCarousel, stopCarousel]);

  // 处理页面可见性变化
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopCarousel();
      } else if (document.visibilityState === 'visible' && isVisible) {
        startCarousel();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible, startCarousel, stopCarousel]);

  // 清理定时器
  useEffect(() => {
    return () => {
      stopCarousel();
    };
  }, [stopCarousel]);

  return (
    <>
      <div className={cx(windowSx, className)}>
        
        <div className={listSx} ref={listRef}>
          {coins.map((coin, index) => (
            <CoinItem
              key={`${coin}-${index}`}
              coin={coin}
              index={index}
              isActive={index === 2}
              coinWidth={coinWidth}
              goldCoinSvg={goldCoinSvg}
              coinSx={coinSx}
              onClick={handleCoinClick}
            />
          ))}
        </div>
      </div>
      
      <CurrencyModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
});

export default CoinCarousel; 