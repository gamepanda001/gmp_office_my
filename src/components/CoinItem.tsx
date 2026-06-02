import React from 'react';
import { css, cx } from '../../styled-system/css';
import { center } from '../../styled-system/patterns';

interface CoinItemProps {
  coin: string;
  index: number;
  isActive?: boolean;
  coinWidth: number;
  goldCoinSvg: any;
  coinSx: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const CoinItem: React.FC<CoinItemProps> = ({
  coin,
  index,
  isActive = false,
  coinWidth,
  goldCoinSvg,
  coinSx,
  onClick,
}) => {
  return (
    <div
      key={`${coin}-${index}`}
      className={cx(coinSx, center(), isActive ? 'actived' : '')}
      style={{
        backgroundImage: `url(${goldCoinSvg.src || goldCoinSvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
      }}
      onClick={onClick}
      data-coin={coin}
    >
      <svg width={coinWidth} height={coinWidth} version="1.1" xmlns="http://www.w3.org/2000/svg">
        {/* 外描边文本 */}
        <text
          x="50%"
          y="50%"
          fill="none"
          stroke="#B47519"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="18px"
          fontWeight="bold"
        >
          {coin}
        </text>
        {/* 填充文本 */}
        <text
          x="50%"
          y="50%"
          fill="#fff"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="18px"
          fontWeight="bold"
        >
          {coin}
        </text>
      </svg>
    </div>
  );
};

export default CoinItem; 