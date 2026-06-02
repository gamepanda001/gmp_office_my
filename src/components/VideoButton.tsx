import React, { useState } from "react";
import { css, cx } from "../../styled-system/css";
import { button } from "../styles/recipes";
import circleRightSvg from "../assets/circle-right.svg";
import VideoModal from "./VideoModal";

interface VideoButtonProps {
  videoSrc?: string;
  title?: string;
}

const VideoButton: React.FC<VideoButtonProps> = ({ 
  videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4", // 默认视频源
  title = "Play Video" 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cx(
          button({
            visual: "primary",
            color: "primary",
            size: "md",
          }),
          css({
            width: "100%",
          })
        )}
      >
        Play Video
        <img src={circleRightSvg.src} alt="Right arrow icon" width={32} height={32} />
      </button>
      
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoSrc={videoSrc}
        title={title}
      />
    </>
  );
};

export default VideoButton;