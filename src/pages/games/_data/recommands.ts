import recommandGame1Png from "../../../assets/recommand-game-1.png";
import recommandGame2Png from "../../../assets/recommand-game-2.png";
import recommandGame3Png from "../../../assets/recommand-game-3.png";
import recommandGame4Png from "../../../assets/recommand-game-4.png";
import recommandGameMobile1Png from "../../../assets/recommand-game-mobile-1.png";
import recommandGameMobile2Png from "../../../assets/recommand-game-mobile-2.png";
import recommandGameMobile3Png from "../../../assets/recommand-game-mobile-3.png";
import recommandGameMobile4Png from "../../../assets/recommand-game-mobile-4.png";
import { games } from "../../../contents/games";

import gamesData from "../../../contents/games.json";

export type RecommandGame = {
  id: string;
  slug: string;
  imageDesktop: string;
  imageMobile: string;
};

// 根据ID查找对应的slug
const getSlugById = (id: string): string => {
  const game = games.find((game) => game.id === id);
  return game?.slug || id; // 如果找不到游戏，回退到使用ID
};

// export const recommandGames: [RecommandGame, RecommandGame, RecommandGame, RecommandGame] = [
//   {
//     id: "1698217737088",
//     slug: getSlugById("1698217737088"),
//     imageDesktop: recommandGame1Png.src,
//     imageMobile: recommandGameMobile1Png.src,
//   },
//   {
//     id: "1698217736199",
//     slug: getSlugById("1698217736199"),
//     imageDesktop: recommandGame2Png.src,
//     imageMobile: recommandGameMobile2Png.src,
//   },
//   {
//     id: "1698217738024",
//     slug: getSlugById("1698217738024"),
//     imageDesktop: recommandGame3Png.src,
//     imageMobile: recommandGameMobile3Png.src,
//   },
//   {
//     id: "1698217737748",
//     slug: getSlugById("1698217737748"),
//     imageDesktop: recommandGame4Png.src,
//     imageMobile: recommandGameMobile4Png.src,
//   },
// ];

export const recommandGames = ((data) => {
  // 获取data中,所有hotgame字段不为null的数据
  const _data = data.filter((item) => {
    return item.hotgame && typeof item.hotgame === 'string' && item.hotgame.trim() !== '';
  })
  
  // 解析hotgame字段并按顺序排序
  const parsedGames = _data.map((item) => {
    const hotgameData = (item.hotgame as string).split(',');
    const order = parseInt(hotgameData[0]?.trim() || '0');
    const desktopImage = hotgameData[1]?.trim() || '';
    const mobileImage = hotgameData[2]?.trim() || '';
    
    return {
      id: item.id,
      slug: getSlugById(item.id),
      imageDesktop: desktopImage,
      imageMobile: mobileImage,
      order: order
    };
  }).sort((a, b) => a.order - b.order); // 按顺序排序
  
  return parsedGames;
})(gamesData);
