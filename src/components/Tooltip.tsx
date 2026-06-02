import React, { useState, useEffect, useRef } from 'react';
import { css } from '../../styled-system/css';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

// 全局事件来管理tooltip的显示状态
const TOOLTIP_EVENT = 'tooltip-show';

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipId = useRef(Math.random().toString(36).substr(2, 9));

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 监听全局tooltip事件，确保同时只有一个tooltip显示
  useEffect(() => {
    const handleTooltipShow = (event: CustomEvent) => {
      if (event.detail !== tooltipId.current && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener(TOOLTIP_EVENT, handleTooltipShow as EventListener);
    
    return () => {
      window.removeEventListener(TOOLTIP_EVENT, handleTooltipShow as EventListener);
    };
  }, [isVisible]);

  // 显示tooltip并通知其他tooltip关闭
  const showTooltip = () => {
    // 发送全局事件，让其他tooltip关闭
    window.dispatchEvent(new CustomEvent(TOOLTIP_EVENT, {
      detail: tooltipId.current
    }));
    setIsVisible(true);
  };

  // 桌面端鼠标事件
  const handleMouseEnter = () => {
    if (!isMobile) {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false);
    }
  };

  // 移动端触摸/点击事件
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault();
      showTooltip();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      showTooltip();
    }
  };

  // 点击其他地方关闭 tooltip（仅移动端）
  useEffect(() => {
    if (!isMobile || !isVisible) return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as Element;
      if (!target.closest('[data-tooltip-container]')) {
        setIsVisible(false);
      }
    };

    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobile, isVisible]);

  return (
    <div 
      data-tooltip-container
      className={css({ 
        position: 'relative', 
        display: 'inline-block',
        cursor: 'pointer'
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      {children}
      {isVisible && (
        <div
          className={css({
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '2px',
            fontSize: '14px',
            fontWeight: '700',
            whiteSpace: 'nowrap',
            zIndex: 10000,
            pointerEvents: 'none',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            // 移动端特殊样式
            ...(isMobile && {
              fontSize: '16px', // 移动端字体稍大
              padding: '12px', // 移动端padding更大，便于触摸
              minWidth: 'max-content', // 确保内容不会被压缩
            }),
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid white',
            }
          })}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip; 