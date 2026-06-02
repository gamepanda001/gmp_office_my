import { useState, type PropsWithChildren } from "react";
import { css, cx } from "../../../../styled-system/css";
import { container } from "../../../../styled-system/patterns";
import loadMoreSvg from "../../../assets/load-more.svg";

const containerSx = cx(
  container({ maxWidth: 1200, boxSizing: "content-box", px: "10px" }),
  css({
    position: "relative",
    overflow: "hidden",
    transition: "max-height 0.6s ease",
  }),
);

interface Props extends PropsWithChildren {
  defaultIsExpend?: boolean;
}

function GamesGridContainer(props: Props) {
  const [isExpend, setIsExpend] = useState(props.defaultIsExpend);
  const onToggle = () => {
    setIsExpend((prev) => !prev);
  };

  return (
    <>
      <div id="grid-container" className={containerSx} style={{ maxHeight: isExpend ? "999999px" : "1600px" }}>
        {props.children}
        <div
          hidden={isExpend}
          className={css({
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "80px",
            backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FAFAFA 100%)",
          })}
        />
      </div>
      <div hidden={isExpend}>
        <button className={css({ mx: "auto", display: "block", pt: "16px" })} onClick={onToggle}>
          <span className={css({ textStyle: "16_600_100" })}>Load More</span>
          <img
            className={css({ display: "inline-block", marginLeft: "4px", lineHeight: "16px" })}
            src={loadMoreSvg.src}
            alt="Load more games icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </>
  );
}

export default GamesGridContainer;
