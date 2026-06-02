import { css, cx } from "../../../../styled-system/css";
import { container, grid, gridItem } from "../../../../styled-system/patterns";
import { recommandGames, type RecommandGame } from '../_data/recommands'
import "react-tabs/style/react-tabs.css";

const sectionSx = container({
  maxWidth: "1226px",
  boxSizing: "content-box",
  pb: { base: "16px", md: "40px" },
  bgColor: "#FFFFFF",
});
const gridSx = cx(
  grid({
    gridTemplateColumns: { base: "1fr 1fr", md: "39.31% 28.38% 28.38%" },
    gridTemplateRows: { base: "auto auto auto", md: "auto auto" },
    gap: { base: "1% 12px", md: " 0px 1.5%" },
  }),
  css({ marginLeft: { base: "0", md: "-1%" } }),
);

function RecommandGamePicture(props: RecommandGame) {
  const { id, slug, imageDesktop, imageMobile } = props;
  const imageSx = css({ width: "100%", transition: "transform 0.3s ease", transform: { base: "none", _hover: "scale(1.05)" } });

  return (
    <a href={`/game/${slug}`}>
      <picture>
        <source srcSet={imageDesktop} media="(min-width: 768px)" />
        <img src={imageMobile} alt={`Recommended game ${id}`} className={imageSx} />
      </picture>
    </a>
  )
}

function RecommandGameSection() {
  return (
    <section className={sectionSx}>
      <h3 className={css({ position: "absolute", top: "0", left: "0", opacity: "0", height: "1px", overflow: "hidden", width: "1px" })}>
        Recommended Games
      </h3>
      <div className={gridSx}>
        <div className={gridItem({ rowSpan: { base: 1, md: 2 }, colSpan: { base: 2, md: 1 } })} >
          <RecommandGamePicture {...recommandGames[0]} />
        </div>
        <div className={gridItem({ colStart: { base: 1, md: 2 }, colEnd: { base: 3, md: 4 } })} >
          <RecommandGamePicture {...recommandGames[1]} />
        </div>
        <div className={gridItem({ rowStart: { base: 3, md: 2 }, colStart: { base: 1, md: 2 }, pt: { base: '0px', md: '3.75%'} })}>
          <RecommandGamePicture {...recommandGames[2]} />
        </div>
        <div className={gridItem({ rowStart: { base: 3, md: 2 }, colStart: { base: 2, md: 3 }, pt: { base: '0px', md: '3.75%'} })} >
          <RecommandGamePicture {...recommandGames[3]} />
        </div>
      </div>
    </section>
  );
}

export default RecommandGameSection;