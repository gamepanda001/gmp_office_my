import { css } from '../../styled-system/css';
import { createPortal } from 'react-dom';
import { useStore } from '@nanostores/react';
import { $isExpoDialogOpen } from '../store';
import { useEffect, useState } from 'react';
import expoFgPng from '../assets/dialog/expo-fg.png';
import expoMobilePng from '../assets/dialog/expo-mobile.png';
import expoCloseIconSvg from '../assets/expo-close-icon.svg';

// Unix时间戳 1749031200 对应 2025年4月25日 00:00:00 UTC
const EXPO_END_TIMESTAMP = 1749031200;

function ExpoDialog() {
    const isOpen = useStore($isExpoDialogOpen);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // 检查当前时间是否超过指定时间戳
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (currentTimestamp < EXPO_END_TIMESTAMP) {
            // 展会期间每次刷新都显示弹窗
            $isExpoDialogOpen.set(true);
        }
    }, []);

    const onClose = () => {
        $isExpoDialogOpen.set(false);
    };

    // 防止服务端渲染问题
    if (!isMounted) {
        return null;
    }

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className={css({
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { base: '20px', md: '40px' }
        })}>
            {/* 背景遮罩 */}
            <div
                className={css({
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    bgColor: 'rgba(0, 29, 39, .8)'
                })}
            />

            {/* 弹窗内容 */}
            <div className={css({
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            })}>
                {/* PC端图片 */}
                <img
                    src={expoFgPng.src}
                    alt="Expo Dialog"
                    className={css({
                        hideBelow: 'md',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '12px',
                    })}
                />

                {/* 移动端图片 */}
                <img
                    src={expoMobilePng.src}
                    alt="Expo Dialog Mobile"
                    className={css({
                        hideFrom: 'md',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '12px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                    })}
                />

                {/* 关闭按钮 */}
                <button
                    onClick={onClose}
                    className={css({
                        position: 'absolute',
                        top: { base: '-50px', md: '-50px' },
                        right: { base: '-5px', md: '-15px' },
                        width: { base: '40px', md: '48px' },
                        height: { base: '40px', md: '48px' },
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        zIndex: 1,

                    })}
                    aria-label="关闭弹窗"
                >
                    <img
                        src={expoCloseIconSvg.src}
                        alt="关闭"
                        className={css({
                            width: { base: '32px', md: '32px' },
                            height: { base: '32px', md: '32px' },
                            transition: 'opacity 0.2s ease'
                        })}
                    />
                </button>
            </div>
        </div>,
        document.body
    );
}

export default ExpoDialog;
