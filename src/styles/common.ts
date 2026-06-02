import { css } from "../../styled-system/css";
import { container } from "../../styled-system/patterns";

export const sectionContainerSx = container.raw({ maxWidth: "1200px", boxSizing: "content-box" });

export const cardSx = css.raw({ bgColor: "#FFFFFF", borderRadius: "16px", overflow: "hidden" });

export const absHoriCenter = css.raw({
  position: "absolute",
  left: "0",
  right: "0",
  mx: "auto",
});

export const fixedHoriCenter = css.raw({
  position: "fixed",
  left: "0",
  right: "0",
  mx: "auto",
});
