import { css } from "../../styled-system/css";
import Modal from "./Modal";

function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showTitle
      title="Privacy Policy"
      showClose
      modalClassName={css({
        width: {
          base: "90%",
          md: "714px",
        },
        maxHeight: {
          base: "550px",
          md: "440px",
        },
        overflowY: "hidden",
      })}
    >
      <div
        className={css({
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          fontSize: "14px",
          lineHeight: "18px",
          color: "#000",
          fontWeight: "400",
          paddingBottom: "32px",
          maxHeight: {
            base: "500px",
            md:"338px",
          },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&": {
            scrollbarWidth: "none",
          },
        })}
      >
        <p>
          Gaming Panda respects your privacy and is committed to protecting any information you provide while using our website
          (https://www.gaming-panda.com). This policy outlines what information we collect, how we use it, and your choices.
        </p>
        <div>
          <p
            className={css({
              marginTop: "10px",
            })}
          >
            1. Information We Collect
          </p>
          <div>
            <p
              className={css({
                marginTop: "10px",
              })}
            >
              a. Automatically Collected Data
            </p>
            <div>
              When you visit our website, we may automatically collect certain information, such as:
              <ul
                className={css({
                  listStyle: "disc",
                  paddingLeft: "20px",
                })}
              >
                <li>Your IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring websites</li>
                <li>Date and time of visit</li>
                <li>Device type and operating system</li>
              </ul>
              <p>
                We may use <b>cookies</b> or similar technologies to enhance user experience. You can disable cookies in your
                browser settings.
              </p>
            </div>
            <p
              className={css({
                marginTop: "10px",
              })}
            >
              b. Contact Information
            </p>
            <p>If you contact us via email, form, or other means, we may collect:</p>
            <ul
              className={css({
                listStyle: "disc",
                paddingLeft: "20px",
              })}
            >
              <li>Your name</li>
              <li>Email address</li>
              <li>Telegram handle or phone number</li>
              <li>Any information you provide in your message</li>
            </ul>
          </div>
        </div>
        <div
          className={css({
            marginTop: "20px",
          })}
        >
          <p>2. How We Use Your Information</p>
          <div>
            <div>
              We use the information collected to:
              <ul
                className={css({
                  listStyle: "disc",
                  paddingLeft: "20px",
                })}
              >
                <li>Provide and improve our website and gaming services</li>
                <li>Respond to inquiries or support requests</li>
                <li>Communicate important updates or promotional offers</li>
                <li>Analyze website usage to enhance user experience</li>
                <li>Prevent fraud and ensure website security</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={css({
            marginTop: "20px",
          })}
        >
          <p>3. Third-Party Services</p>
          <p>
            We may use third-party tools for analytics and marketing purposes, which may place cookies or collect limited data.
            These include:
          </p>
          <ul>
            <li>Google Analytics (usage tracking)</li>
            <li>Meta Pixel (Facebook) (advertising insights)</li>
            <li>Cloudflare (security and CDN)</li>
            <li>Mailchimp (email delivery)</li>
          </ul>
        </div>
        <div
          className={css({
            marginTop: "20px",
          })}
        >
          <p>4. Data Sharing</p>
          <p>Gaming Panda does not sell or rent your personal data. We only share information:</p>
          <ul>
            <li>With trusted service providers under strict confidentiality agreements</li>
            <li>If required by law, regulation, or legal process</li>
            <li>To protect our legal rights or the safety of users</li>
          </ul>
        </div>
        <div
          className={css({
            marginTop: "20px",
          })}
        >
          <p>5. Data Security</p>
          <p>
            We implement reasonable technical and organizational measures to safeguard your information from unauthorized
            access, disclosure, or misuse.
          </p>
        </div>
        <div
          className={css({
            marginTop: "20px",
          })}
        >
          <p>6. Your Rights</p>
          <p>Depending on your location, you may have rights such as:</p>
          <ul>
            <li>Access to your personal data</li>
            <li>Correction or deletion of your data</li>
            <li>Objection to or limitation of data processing</li>
            <li>Withdrawal of consent for future use</li>
          </ul>
          <p>
            To exercise these rights, please email:{" "}
            <a href="mailto:Contact@Gaming-Panda.Com" className={css({ color: "#01B6CF", cursor: "pointer" })}>
              Contact@Gaming-Panda.Com
            </a>
          </p>
        </div>
        <div
          className={css({
            marginTop: "20px",
          })}
        >
          <p>7. Children's Privacy</p>
          <p>
            Our website and games are not intended for individuals under the age of 18. We do not knowingly collect personal
            data from minors.
          </p>
        </div>
        <div
          className={css({
            marginTop: "20px",
          })}
        >
          <p>8. Changes to This Policy</p>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective
            date.
          </p>
          <p>
            <b>Effective Date:</b> July 8, 2025
          </p>
          <p>
            For questions, please contact us at:&nbsp;
            <a href="mailto:Contact@Gaming-Panda.Com" className={css({ color: "#01B6CF", cursor: "pointer" })}>
              Contact@Gaming-Panda.Com
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default PrivacyModal;
