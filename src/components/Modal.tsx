import React, { useState, useEffect } from "react";
import { css, cx } from "../../styled-system/css";
import { createPortal } from "react-dom";
import expoCloseIconSvg from "../assets/expo-close-icon.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClassName?: string;
  showTitle?: boolean;
  title?: string;
  showClose?: boolean;
  closeButtonClassName?: string;
}

const modalOverlaySx = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 99999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: { base: "20px", md: "40px" },
  opacity: 0,
  visibility: "hidden",
  transition: "all 0.3s ease",
  "&.show": {
    opacity: 1,
    visibility: "visible",
  },
});

const modalContentSx = css({
  backgroundColor: "#FFFFFF",
  borderRadius: { base: "16px", md: "24px" },
  padding: { base: "20px", md: "32px" },
  width: { base: "95vw", md: "714px" },
  height: { base: "85vh", md: "440px" },
  maxWidth: "714px",
  maxHeight: { base: "85vh", md: "440px" },
  overflowY: "auto",
  position: "relative",
  transform: "scale(0.8)",
  transition: "transform 0.3s ease",
  "&.show": {
    transform: "scale(1)",
  },
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    display: "none",
  },
  "&::-webkit-scrollbar-track": {
    display: "none",
  },
});

const headerSx = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});

const titleSx = css({
  fontSize: { base: "20px", md: "24px" },
  lineHeight: "17px",
  fontWeight: "bold",
  color: "#00B4D8",
  margin: 0,
});

const closeButtonSx = css({
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  width: { base: "28px", md: "32px" },
  height: { base: "28px", md: "32px" },
  position: "absolute",
  right: { base: "16px", md: "0px" },
  top: { base: "-32px", md: "-52px" },
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  transition: "all 0.2s ease",
  background: "transparent",
});

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalClassName,
  showTitle,
  title,
  showClose,
  closeButtonClassName,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 防止服务端渲染问题
  if (!isMounted) {
    return null;
  }

  if (!isOpen && !isAnimating) return null;

  return createPortal(
    <div
      className={cx(modalOverlaySx, isOpen && "show")}
      onClick={handleOverlayClick}
      onTransitionEnd={() => {
        if (!isOpen) setIsAnimating(false);
      }}
    >
      <div
        className={css({
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        {showClose && (
          <button className={cx(closeButtonSx, closeButtonClassName)} onClick={onClose}>
            <img src={expoCloseIconSvg.src} alt="关闭" style={{ width: "100%", height: "100%" }} />
          </button>
        )}

        <div className={cx(modalContentSx, isOpen && "show", modalClassName)}>
          {showTitle && (
            <div className={headerSx}>
              <h2 className={titleSx}>{title}</h2>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
