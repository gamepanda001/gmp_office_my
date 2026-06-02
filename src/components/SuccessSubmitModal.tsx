import { navigate } from "astro:transitions/client";
import { css } from "../../styled-system/css";
import SuccessIcon from "../assets/success.svg";
import Modal from "./Modal";

function SuccessSubmitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalClassName={css({
        width: {
          base: "80%",
          md: "375px",
        },
        maxHeight: {
          base: "267px",
          md: "300px",
        },
        paddingY: "28px",
      })}
    >
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        })}
      >
        <img src={SuccessIcon.src} alt="success" width={64} height={64} />
        <p
          className={css({
            textStyle: {
              base: "16_700_100",
              md: "24_700_100",
            },
            marginTop: "10px",
          })}
        >
          Thank you for your interest!
        </p>
        <p
          className={css({
            textStyle: "14_500_100",
            marginTop: "18px",
            textAlign: "center",
            color: "#6D7A7D",
            lineHeight: "21px",
          })}
        >
          Our team will get back to you very soon. While you wait, please try our{" "}
          <span
            className={css({
              color: "#01B6CF",
              textDecoration: "underline",
              cursor: "pointer",
            })}
            onClick={() => {
              // 新页面打开
              window.open("/games", "_blank");
              // navigate("/games");
            }}
          >
            Games
          </span>
        </p>
        <button
          className={css({
            width: "100%",
            height: "48px",
            backgroundColor: "#F74774",
            color: "#fff",
            borderRadius: "full",
            marginTop: "24px",
            cursor: "pointer",
            textStyle: "20_700_100",
          })}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default SuccessSubmitModal;
