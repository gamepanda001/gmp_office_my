import React from "react";
import Modal from "./Modal";
import { css } from "../../styled-system/css";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

const videoContainerSx = css({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const videoSx = css({
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  objectFit: "cover",
});

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, title = "Video Player" }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showClose={true}
      showTitle={false}
      title={title}
      modalClassName={css({
        padding: "0 !important",
        width: {
          base: "100%",
          md: "1200px !important",
        },
        maxWidth: {
          base: "95vw",
          md: "1200px !important",
        },
        height: {
          base: "225px",
          md: "720px !important",
        },
        maxHeight: {
          base: "225px",
          md: "720px !important",
        },
        borderRadius: "0 !important",
      })}
      closeButtonClassName={css({
        position: "absolute",
        top: {
          md: "-32px !important",
        },
        right: {
          base: "-16px",
          md: "-32px !important",
        },
      })}
    >
      <div className={videoContainerSx}>
        <video className={videoSx} controls autoPlay muted playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  );
};

export default VideoModal;
