import { gameCompare, games, sortedGames } from "../../../contents/games";
import { css, cx } from "../../../../styled-system/css";

import { grid, hstack } from "../../../../styled-system/patterns";
import GamesGridContainer from "./GamesGridContainer";
import GameCard from "./GameCard";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RecommandGameSection from "./RecommandGameSection";
import { recommandGames } from "../_data/recommands";
import { groupBy } from "lodash-es";

const gameGridSx = cx(grid({ gridTemplateColumns: { base: 2, sm: 3 }, gap: { base: "10px", md: "24px", lg: "32px" } }));
const recommandGameIds = recommandGames.map((game) => game.id);

const allGameSorted = sortedGames.filter((game) => !recommandGameIds.includes(game.id));

const gamesGroupByCategory = groupBy(games, "category");
for (const key in gamesGroupByCategory) {
  gamesGroupByCategory[key].sort(gameCompare);
}
const categorys = Object.keys(gamesGroupByCategory).sort((a, b) => a.localeCompare(b));

function GameList(props: { className?: string; list: typeof games; categoryName?: string }) {
  const { className, list, categoryName } = props;
  return (
    <section className={cx(css({ py: { base: "16px", lg: "40px" } }), className)}>
      {categoryName && (
        <h3 className={css({ position: "absolute", top: "0", left: "0", opacity: "0", height: "1px", overflow: "hidden", width: "1px" })}>
          {categoryName} Games
        </h3>
      )}
      <GamesGridContainer defaultIsExpend={list.length <= 9}>
        <div className={gameGridSx}>
          {list.map(({ slug, cover, title, icon, desc, cardBgColor }) => (
            <a href={`/game/${slug}`} title={title} key={slug}>
              <GameCard cover={cover} title={title} icon={icon} desc={desc} cardBgColor={cardBgColor} />
            </a>
          ))}
        </div>
      </GamesGridContainer>
    </section>
  );
}

function GamesTabs() {
  return (
    <Tabs
      selectedTabClassName={css({
        borderRadius: "9999px",
        bgColor: { base: "#F74774", _hover: "#FF5480" },
        color: { base: "#FFFFFF", _hover: "#FFFFFF" },
        textStyle: { base: "14_800_100", md: "20_800_100" },
      })}
    >
      <TabList
        className={cx(
          hstack({
            gap: "20px",
            justify: { base: "flex-start", md: "center" },
            mt: { base: "40px", md: "0" },
            mb: "8px",
            px: { base: "16px", md: "0" },
            flexWrap: "nowrap",
            overflowX: "auto",
          }),
          css({ scrollbar: "hidden" }),
        )}
      >
        {["All", ...categorys].map((category, index) => (
          <Tab
            className={css({
              color: { base: "#6D7A7D", _hover: "#F74774" },
              px: { base: "24px", md: "32px" },
              py: { base: "16px", md: "20px" },
              textStyle: { base: "14_600_100", md: "20_600_100" },
              cursor: "pointer",
              whiteSpace: "nowrap",
              _focusVisible: { outline: "none" },
            })}
            key={index}
          >
            {category}
          </Tab>
        ))}
      </TabList>
      <TabPanel>
        <RecommandGameSection />
        <GameList className={css({ bgColor: "#FAFAFA" })} list={allGameSorted} categoryName="All" />
      </TabPanel>
      {categorys.map((category, index) => (
        <TabPanel key={index}>
          <GameList list={gamesGroupByCategory[category]} categoryName={category} />
        </TabPanel>
      ))}
    </Tabs>
  );
}

export default GamesTabs;
