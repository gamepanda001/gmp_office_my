import { css, cx } from '../../../../styled-system/css';
import { button } from '../../../styles/recipes';
import { createPortal } from 'react-dom';
import { useStore } from '@nanostores/react'
import { $isOpen, $isPlayMode, $hasLoaded } from '../../../store';

function Modal() {
    const isOpen = useStore($isOpen)
    const hasLoaded = useStore($hasLoaded)

    const onClose = () => {
        $isOpen.set(false)
    }

    const onOk = () => {
        localStorage.setItem("isConfirmed", "true")
        $isOpen.set(false)
        if (!hasLoaded) {
            $hasLoaded.set(true);
        }
        $isPlayMode.set(true)
    }

    if (!isOpen) { return null }

    return createPortal(
        <div className={css({ position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', zIndex: 99999 })}>
            <div className={css({ width: '100%', height: '100%', position: 'absolute', left: '0', top: '0', bgColor: 'rgba(0, 29, 39, .5)' })} />
            <div className={css({ position: 'absolute', top: '0', right: '0', bottom: '0', left: '0', mx: 'auto', my: 'auto', width: '375px', height: 'max-content', borderRadius: '24px', p: '32px', bgColor: '#FFFFFF', textAlign: 'center' })}>
                <div className={css({ textStyle: '24_700_100', mb: '24px' })}>Safe and Responsible Play ahead!</div>
                <p className={css({ textStyle: '14_500_142', mb: '32px', color: "#6D7A7D" })}>We take Responsible Gaming seriously.Please confirm you are of a legal age to play online casino games and enjoy your stay!</p>
                <button className={cx(button({ size: "modal" }), css({ mb: '20px' }))} type="button" onClick={onOk}>
                    <span>Yes, I am 18+</span>
                </button>
                <button className={cx(button({ size: "modal", visual: 'ghost' }))} type="button" onClick={onClose}>
                    <span>No, I can't do it</span>
                </button>
            </div>
        </div>,
        document.body
    )
};

export default Modal;