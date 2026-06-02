import { css } from "../../styled-system/css";
import tgContact1 from "../assets/tg-contact-1.png";
import tgContact2 from "../assets/tg-contact-2.png";
import emailIcon from "../assets/email.svg";
import whatsappIcon from "../assets/whatsapp.svg";
import tgIcon from "../assets/telegram.svg";

const subTitleSx = css({
  textStyle: {
    md: "16_800_100",
    base: "14_800_100",
  },
  color: "#1B2C38",
  textDecoration: "underline",
  cursor: "pointer",
});

const contactItemSx = css({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  justifyContent: {
    md: "flex-start",
    base: "center",
  },
});

interface TelegramContactProps {
  qrCodeSrc: string;
  qrCodeAlt: string;
  link: string;
  name: string;
}

function TelegramContact({ qrCodeSrc, qrCodeAlt, link, name }: TelegramContactProps) {
  const openLink = () => {
    window.open(link, "_blank");
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
      })}
    >
      <img
        src={qrCodeSrc}
        alt={qrCodeAlt}
        width={128}
        height={128}
        className={css({
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
          },
        })}
        onClick={openLink}
      />
      <p
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "6px",
          justifyContent: "flex-start",
        })}
        onClick={openLink}
      >
        <img src={tgIcon.src} alt="Telegram icon" width={18} height={18} />
        <span className={subTitleSx}>{name}</span>
      </p>
    </div>
  );
}

function ShowContact() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: {
          md: "40px",
          base: "16px",
        },
        height: "100%",
        width: "100%",
        marginTop: {
          md: "14px",
          base: "0px",
        },
      })}
    >
      {/* 标题 */}
      <p
        className={css({
          textStyle: "16_400_100",
          color: "#6D7A7D",
          lineHeight: "24px",
          ml: "4px",
          textAlign: {
            md: "left",
            base: "center",
          },
        })}
      >
        You can contact us directly via Telegram for the fastest response. Alternatively, feel free to reach out by email,
        WhatsApp, or by filling out the form to help us better understand your business needs.
      </p>
      {/* 联系方式 */}
      <div
        className={css({
          display: "flex",
          gap: "26px",
          alignItems: "center",
          justifyContent: {
            md: "left",
            base: "center",
          },
          width: "100%",
        })}
      >
        <TelegramContact
          qrCodeSrc={tgContact2.src}
          qrCodeAlt="GMP Service Telegram QR Code"
          link="https://t.me/GamingPanda01"
          name="GMP Service"
        />
        <TelegramContact
          qrCodeSrc={tgContact1.src}
          qrCodeAlt="GamingPanda Contact Telegram QR Code"
          link="https://t.me/GamingPandaContact"
          name="GamingPanda Contact"
        />
      </div>
      {/* 邮箱和手机 */}
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          width: "100%",
          ml: "4px",
          marginTop: {
            base: "8px",
            md: "0",
          },
        })}
      >
        <div className={contactItemSx}>
          <img src={emailIcon.src} alt="Email icon" width={24} height={24} />
          <a href="mailto:Contact@gaming-panda.com" className={subTitleSx}>
            Contact@gaming-panda.com
          </a>
        </div>
        <a href="https://wa.me/84936094170" target="_blank" rel="noopener noreferrer" className={contactItemSx}>
          <img src={whatsappIcon.src} alt="Phone icon" width={24} height={24} />
          <span className={subTitleSx}>+84 936 094 170</span>
        </a>
      </div>
    </div>
  );
}

export default ShowContact;
