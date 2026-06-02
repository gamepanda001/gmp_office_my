import gamesData from "./games.json";
import { generateGameSlug } from "../utils/slugify";


import gameIconLabubuMinesPng from "../assets/game-icon/labubu-mines.png";  
import gameCoverLabubuMinesPng from "../assets/game-cover/labubu-mines.png";
import gameCardLabubuMinesPng from "../assets/game-card/labubu-mines.png";
import gameHeroImageFgLabubuMinesPng from "../assets/game-hero-image/labubu-mines-fg.png";
import gameHeroImageBgLabubuMinesPng from "../assets/game-hero-image/labubu-mines-bg.png";
import gameHeroImageMobileLabubuMinesPng from "../assets/game-hero-image/labubu-mines-mobile.png";
import gameScreenshotLabubuMines1Png from "../assets/game-screenshot/labubu-mines-1.png";
import gameScreenshotLabubuMines2Png from "../assets/game-screenshot/labubu-mines-2.png";
import gameScreenshotLabubuMines3Png from "../assets/game-screenshot/labubu-mines-3.png";


import gameIconLabubuForSugarPng from "../assets/game-icon/labubu-for-sugar.png";
import gameCoverLabubuForSugarPng from "../assets/game-cover/labubu-for-sugar.png";
import gameCardLabubuForSugarPng from "../assets/game-card/labubu-for-sugar.png";
import gameHeroImageFgLabubuForSugarPng from "../assets/game-hero-image/labubu-for-sugar-fg.png";
import gameHeroImageBgLabubuForSugarPng from "../assets/game-hero-image/labubu-for-sugar-bg.png";
import gameHeroImageMobileLabubuForSugarPng from "../assets/game-hero-image/labubu-for-sugar-mobile.png";
import gameScreenshotLabubuForSugar1Png from "../assets/game-screenshot/labubu-for-sugar-1.png";  
import gameScreenshotLabubuForSugar2Png from "../assets/game-screenshot/labubu-for-sugar-2.png";
import gameScreenshotLabubuForSugar3Png from "../assets/game-screenshot/labubu-for-sugar-3.png";



import gameIconGoLabubuPng from "../assets/game-icon/go-labubu.png";
import gameCoverGoLabubuPng from "../assets/game-cover/go-labubu.png";
import gameCardGoLabubuPng from "../assets/game-card/go-labubu.png";
import gameHeroImageFgGoLabubuPng from "../assets/game-hero-image/go-labubu-fg.png";
import gameHeroImageBgGoLabubuPng from "../assets/game-hero-image/go-labubu-bg.png";
import gameHeroImageMobileGoLabubuPng from "../assets/game-hero-image/go-labubu-mobile.png";
import gameScreenshotGoLabubu1Png from "../assets/game-screenshot/go-labubu-1.png";
import gameScreenshotGoLabubu2Png from "../assets/game-screenshot/go-labubu-2.png";
import gameScreenshotGoLabubu3Png from "../assets/game-screenshot/go-labubu-3.png";


import gameIconRockPapaerScissorsPng from "../assets/game-icon/rock-paper-scissors.png";
import gameCoverRockPapaerScissorsPng from "../assets/game-cover/rock-paper-scissors.png";
import gameCardRockPapaerScissorsPng from "../assets/game-card/rock-paper-scissors.png";
import gameHeroImageFgRockPapaerScissorsPng from "../assets/game-hero-image/rock-paper-scissors-fg.png";
import gameHeroImageBgRockPapaerScissorsPng from "../assets/game-hero-image/rock-paper-scissors-bg.png";
import gameHeroImageMobileRockPapaerScissorsPng from "../assets/game-hero-image/rock-paper-scissors-mobile.png";
import gameScreenshotRockPapaerScissors1Png from "../assets/game-screenshot/rock-paper-scissors-1.png";
import gameScreenshotRockPapaerScissors2Png from "../assets/game-screenshot/rock-paper-scissors-2.png";
import gameScreenshotRockPapaerScissors3Png from "../assets/game-screenshot/rock-paper-scissors-3.png";


import gameIconInbetweenPng from "../assets/game-icon/in-between.png";
import gameCoverInbetweenPng from "../assets/game-cover/in-between.png";
import gameCardInbetweenPng from "../assets/game-card/in-between.png";
import gameHeroImageFgInbetweenPng from "../assets/game-hero-image/in-between-fg.png";
import gameHeroImageBgInbetweenPng from "../assets/game-hero-image/in-between-bg.png";
import gameHeroImageMobileInbetweenPng from "../assets/game-hero-image/in-between-mobile.png";
import gameScreenshotInbetween1Png from "../assets/game-screenshot/in-between-1.png";
import gameScreenshotInbetween2Png from "../assets/game-screenshot/in-between-2.png";
import gameScreenshotInbetween3Png from "../assets/game-screenshot/in-between-3.png"; 
import gameScreenshotInbetween4Png from "../assets/game-screenshot/in-between-4.png";




import gameIconBankHeistPng from "../assets/game-icon/bank-heist.png";
import gameCoverBankHeistPng from "../assets/game-cover/bank-heist.png";
import gameCardBankHeistPng from "../assets/game-card/bank-heist.png";
import gameHeroImageFgBankHeistPng from "../assets/game-hero-image/bank-heist-fg.png";
import gameHeroImageBgBankHeistPng from "../assets/game-hero-image/bank-heist-bg.png";
import gameHeroImageMobileBankHeistPng from "../assets/game-hero-image/bank-heist-mobile.png";
import gameScreenshotBankHeist1Png from "../assets/game-screenshot/bank-heist-1.png";
import gameScreenshotBankHeist2Png from "../assets/game-screenshot/bank-heist-2.png";
import gameScreenshotBankHeist3Png from "../assets/game-screenshot/bank-heist-3.png";

import gameIconColorGamePng from "../assets/game-icon/color-game.png";
import gameCoverColorGamePng from "../assets/game-cover/color-game.png";
import gameCardColorGamePng from "../assets/game-card/color-game.png";
import gameHeroImageFgColorGamePng from "../assets/game-hero-image/color-game-fg.png";
import gameHeroImageBgColorGamePng from "../assets/game-hero-image/color-game-bg.png";
import gameHeroImageMobileColorGamePng from "../assets/game-hero-image/color-game-mobile.png";
import gameScreenshotColorGame1Png from "../assets/game-screenshot/color-game-1.png";
import gameScreenshotColorGame2Png from "../assets/game-screenshot/color-game-2.png";
import gameScreenshotColorGame3Png from "../assets/game-screenshot/color-game-3.png";

import gameIconCrashPng from "../assets/game-icon/crash.png";
import gameCoverCrashPng from "../assets/game-cover/crash.png";
import gameCardCrashPng from "../assets/game-card/crash.png";
import gameHeroImageFgCrashPng from "../assets/game-hero-image/crash-fg.png";
import gameHeroImageBgCrashPng from "../assets/game-hero-image/crash-bg.png";
import gameHeroImageMobileCrashPng from "../assets/game-hero-image/crash-mobile.png";
import gameScreenshotCrash1Png from "../assets/game-screenshot/crash-1.png";
import gameScreenshotCrash2Png from "../assets/game-screenshot/crash-2.png";
import gameScreenshotCrash3Png from "../assets/game-screenshot/crash-3.png";

import gameIconCricketCrashPng from "../assets/game-icon/cricket-crash.png";
import gameCoverCricketCrashPng from "../assets/game-cover/cricket-crash.png";
import gameCardCricketCrashPng from "../assets/game-card/cricket-crash.png";
import gameHeroImageFgCricketCrashPng from "../assets/game-hero-image/cricket-crash-fg.png";
import gameHeroImageBgCricketCrashPng from "../assets/game-hero-image/cricket-crash-bg.png";
import gameHeroImageMobileCricketCrashPng from "../assets/game-hero-image/cricket-crash-mobile.png";
import gameScreenshotCricketCrash1Png from "../assets/game-screenshot/cricket-crash-1.png";
import gameScreenshotCricketCrash2Png from "../assets/game-screenshot/cricket-crash-2.png";
import gameScreenshotCricketCrash3Png from "../assets/game-screenshot/cricket-crash-3.png";

import gameIconDicePng from "../assets/game-icon/dice.png";
import gameCoverDicePng from "../assets/game-cover/dice.png";
import gameCardDicePng from "../assets/game-card/dice.png";
import gameHeroImageFgDicePng from "../assets/game-hero-image/dice-fg.png";
import gameHeroImageBgDicePng from "../assets/game-hero-image/dice-bg.png";
import gameHeroImageMobileDicePng from "../assets/game-hero-image/dice-mobile.png";
import gameScreenshotDice1Png from "../assets/game-screenshot/dice-1.png";
import gameScreenshotDice2Png from "../assets/game-screenshot/dice-2.png";
import gameScreenshotDice3Png from "../assets/game-screenshot/dice-3.png";

import gameIconDoublePng from "../assets/game-icon/double.png";
import gameCoverDoublePng from "../assets/game-cover/double.png";
import gameCardDoublePng from "../assets/game-card/double.png";
import gameHeroImageFgDoublePng from "../assets/game-hero-image/double-fg.png";
import gameHeroImageBgDoublePng from "../assets/game-hero-image/double-bg.png";
import gameHeroImageMobileDoublePng from "../assets/game-hero-image/double-mobile.png";
import gameScreenshotDouble1Png from "../assets/game-screenshot/double-1.png";
import gameScreenshotDouble2Png from "../assets/game-screenshot/double-2.png";
import gameScreenshotDouble3Png from "../assets/game-screenshot/double-3.png";

import gameIconFierybotPng from "../assets/game-icon/fierybot.png";
import gameCoverFierybotPng from "../assets/game-cover/fierybot.png";
import gameCardFierybotPng from "../assets/game-card/fierybot.png";
import gameHeroImageFgFierybotPng from "../assets/game-hero-image/fierybot-fg.png";
import gameHeroImageBgFierybotPng from "../assets/game-hero-image/fierybot-bg.png";
import gameHeroImageMobileFierybotPng from "../assets/game-hero-image/fierybot-mobile.png";
import gameScreenshotFierybot1Png from "../assets/game-screenshot/fierybot-1.png";
import gameScreenshotFierybot2Png from "../assets/game-screenshot/fierybot-2.png";
import gameScreenshotFierybot3Png from "../assets/game-screenshot/fierybot-3.png";

import gameIconFastFuriousPng from "../assets/game-icon/fast-furious.png";
import gameCoverFastFuriousPng from "../assets/game-cover/fast-furious.png";
import gameCardFastFuriousPng from "../assets/game-card/fast-furious.png";
import gameHeroImageFgFastFuriousPng from "../assets/game-hero-image/fast-furious-fg.png";
import gameHeroImageBgFastFuriousPng from "../assets/game-hero-image/fast-furious-bg.png";
import gameHeroImageMobileFastFuriousPng from "../assets/game-hero-image/fast-furious-mobile.png";
import gameScreenshotFastFurious1Png from "../assets/game-screenshot/fast-furious-1.png";
import gameScreenshotFastFurious2Png from "../assets/game-screenshot/fast-furious-2.png";
import gameScreenshotFastFurious3Png from "../assets/game-screenshot/fast-furious-3.png";

import gameIconFootballXPng from "../assets/game-icon/football-x.png";
import gameCoverFootballXPng from "../assets/game-cover/football-x.png";
import gameCardFootballXPng from "../assets/game-card/football-x.png";
import gameHeroImageFgFootballXPng from "../assets/game-hero-image/football-x-fg.png";
import gameHeroImageBgFootballXPng from "../assets/game-hero-image/football-x-bg.png";
import gameHeroImageMobileFootballXPng from "../assets/game-hero-image/football-x-mobile.png";
import gameScreenshotFootballX1Png from "../assets/game-screenshot/football-x-1.png";
import gameScreenshotFootballX2Png from "../assets/game-screenshot/football-x-2.png";
import gameScreenshotFootballX3Png from "../assets/game-screenshot/football-x-3.png";

import gameIconKenoPng from "../assets/game-icon/keno.png";
import gameCoverKenoPng from "../assets/game-cover/keno.png";
import gameCardKenoPng from "../assets/game-card/keno.png";
import gameHeroImageFgKenoPng from "../assets/game-hero-image/keno-fg.png";
import gameHeroImageBgKenoPng from "../assets/game-hero-image/keno-bg.png";
import gameHeroImageMobileKenoPng from "../assets/game-hero-image/keno-mobile.png";
import gameScreenshotKeno1Png from "../assets/game-screenshot/keno-1.png";
import gameScreenshotKeno2Png from "../assets/game-screenshot/keno-2.png";
import gameScreenshotKeno3Png from "../assets/game-screenshot/keno-3.png";

import gameIconLimboPng from "../assets/game-icon/limbo.png";
import gameCoverLimboPng from "../assets/game-cover/limbo.png";
import gameCardLimboPng from "../assets/game-card/limbo.png";
import gameHeroImageFgLimboPng from "../assets/game-hero-image/limbo-fg.png";
import gameHeroImageBgLimboPng from "../assets/game-hero-image/limbo-bg.png";
import gameHeroImageMobileLimboPng from "../assets/game-hero-image/limbo-mobile.png";
import gameScreenshotLimbo1Png from "../assets/game-screenshot/limbo-1.png";
import gameScreenshotLimbo2Png from "../assets/game-screenshot/limbo-2.png";
import gameScreenshotLimbo3Png from "../assets/game-screenshot/limbo-3.png";

import gameIconLuckyTanksPng from "../assets/game-icon/lucky-tanks.png";
import gameCoverLuckyTanksPng from "../assets/game-cover/lucky-tanks.png";
import gameCardLuckyTanksPng from "../assets/game-card/lucky-tanks.png";
import gameHeroImageFgLuckyTanksPng from "../assets/game-hero-image/lucky-tanks-fg.png";
import gameHeroImageBgLuckyTanksPng from "../assets/game-hero-image/lucky-tanks-bg.png";
import gameHeroImageMobileLuckyTanksPng from "../assets/game-hero-image/lucky-tanks-mobile.png";
import gameScreenshotLuckyTanks1Png from "../assets/game-screenshot/lucky-tanks-1.png";
import gameScreenshotLuckyTanks2Png from "../assets/game-screenshot/lucky-tanks-2.png";
import gameScreenshotLuckyTanks3Png from "../assets/game-screenshot/lucky-tanks-3.png";

import gameIconMinesPng from "../assets/game-icon/mines.png";
import gameCoverMinesPng from "../assets/game-cover/mines.png";
import gameCardMinesPng from "../assets/game-card/mines.png";
import gameHeroImageFgMinesPng from "../assets/game-hero-image/mines-fg.png";
import gameHeroImageBgMinesPng from "../assets/game-hero-image/mines-bg.png";
import gameHeroImageMobileMinesPng from "../assets/game-hero-image/mines-mobile.png";
import gameScreenshotMines1Png from "../assets/game-screenshot/mines-1.png";
import gameScreenshotMines2Png from "../assets/game-screenshot/mines-2.png";
import gameScreenshotMines3Png from "../assets/game-screenshot/mines-3.png";

import gameIconNeedForXPng from "../assets/game-icon/need-for-x.png";
import gameCoverNeedForXPng from "../assets/game-cover/need-for-x.png";
import gameCardNeedForXPng from "../assets/game-card/need-for-x.png";
import gameHeroImageFgNeedForXPng from "../assets/game-hero-image/need-for-x-fg.png";
import gameHeroImageBgNeedForXPng from "../assets/game-hero-image/need-for-x-bg.png";
import gameHeroImageMobileNeedForXPng from "../assets/game-hero-image/need-for-x-mobile.png";
import gameScreenshotNeedForX1Png from "../assets/game-screenshot/need-for-x-1.png";
import gameScreenshotNeedForX2Png from "../assets/game-screenshot/need-for-x-2.png";
import gameScreenshotNeedForX3Png from "../assets/game-screenshot/need-for-x-3.png";

import gameIconNinjaCrashPng from "../assets/game-icon/ninja-crash.png";
import gameCoverNinjaCrashPng from "../assets/game-cover/ninja-crash.png";
import gameCardNinjaCrashPng from "../assets/game-card/ninja-crash.png";
import gameHeroImageFgNinjaCrashPng from "../assets/game-hero-image/ninja-crash-fg.png";
import gameHeroImageBgNinjaCrashPng from "../assets/game-hero-image/ninja-crash-bg.png";
import gameHeroImageMobileNinjaCrashPng from "../assets/game-hero-image/ninja-crash-mobile.png";
import gameScreenshotNinjaCrash1Png from "../assets/game-screenshot/ninja-crash-1.png";
import gameScreenshotNinjaCrash2Png from "../assets/game-screenshot/ninja-crash-2.png";
import gameScreenshotNinjaCrash3Png from "../assets/game-screenshot/ninja-crash-3.png";

import gameIconPandaCrashPng from "../assets/game-icon/panda-crash.png";
import gameCoverPandaCrashPng from "../assets/game-cover/panda-crash.png";
import gameCardPandaCrashPng from "../assets/game-card/panda-crash.png";
import gameHeroImageFgPandaCrashPng from "../assets/game-hero-image/panda-crash-fg.png";
import gameHeroImageBgPandaCrashPng from "../assets/game-hero-image/panda-crash-bg.png";
import gameHeroImageMobilePandaCrashPng from "../assets/game-hero-image/panda-crash-mobile.png";
import gameScreenshotPandaCrash1Png from "../assets/game-screenshot/panda-crash-1.png";
import gameScreenshotPandaCrash2Png from "../assets/game-screenshot/panda-crash-2.png";
import gameScreenshotPandaCrash3Png from "../assets/game-screenshot/panda-crash-3.png";

import gameIconRingPng from "../assets/game-icon/ring.png";
import gameCoverRingPng from "../assets/game-cover/ring.png";
import gameCardRingPng from "../assets/game-card/ring.png";
import gameHeroImageFgRingPng from "../assets/game-hero-image/ring-fg.png";
import gameHeroImageBgRingPng from "../assets/game-hero-image/ring-bg.png";
import gameHeroImageMobileRingPng from "../assets/game-hero-image/ring-mobile.png";
import gameScreenshotRing1Png from "../assets/game-screenshot/ring-1.png";
import gameScreenshotRing2Png from "../assets/game-screenshot/ring-2.png";
import gameScreenshotRing3Png from "../assets/game-screenshot/ring-3.png";

import gameIconMonopolyPng from "../assets/game-icon/monopoly.png";
import gameCoverMonopolyPng from "../assets/game-cover/monopoly.png";
import gameCardMonopolyPng from "../assets/game-card/monopoly.png";
import gameHeroImageFgMonopolyPng from "../assets/game-hero-image/monopoly-fg.png";
import gameHeroImageBgMonopolyPng from "../assets/game-hero-image/monopoly-bg.png";
import gameHeroImageMobileMonopolyPng from "../assets/game-hero-image/monopoly-mobile.png";
import gameScreenshotMonopoly1Png from "../assets/game-screenshot/monopoly-1.png";
import gameScreenshotMonopoly2Png from "../assets/game-screenshot/monopoly-2.png";
import gameScreenshotMonopoly3Png from "../assets/game-screenshot/monopoly-3.png";
import gameScreenshotMonopoly4Png from "../assets/game-screenshot/monopoly-4.png";

import gameIconYummyCarnivalPng from "../assets/game-icon/yummy-carnival.png";
import gameCoverYummyCarnivalPng from "../assets/game-cover/yummy-carnival.png";
import gameCardYummyCarnivalPng from "../assets/game-card/yummy-carnival.png";
import gameHeroImageFgYummyCarnivalPng from "../assets/game-hero-image/yummy-carnival-fg.png";
import gameHeroImageBgYummyCarnivalPng from "../assets/game-hero-image/yummy-carnival-bg.png";
import gameHeroImageMobileYummyCarnivalPng from "../assets/game-hero-image/yummy-carnival-mobile.png";
import gameScreenshotYummyCarnival1Png from "../assets/game-screenshot/yummy-carnival-1.png";
import gameScreenshotYummyCarnival2Png from "../assets/game-screenshot/yummy-carnival-2.png";
import gameScreenshotYummyCarnival3Png from "../assets/game-screenshot/yummy-carnival-3.png";

import gameIconSushiMinesPng from "../assets/game-icon/sushi-mines.png";
import gameCoverSushiMinesPng from "../assets/game-cover/sushi-mines.png";
import gameCardSushiMinesPng from "../assets/game-card/sushi-mines.png";
import gameHeroImageFgSushiMinesPng from "../assets/game-hero-image/sushi-mines-fg.png";
import gameHeroImageBgSushiMinesPng from "../assets/game-hero-image/sushi-mines-bg.png";
import gameHeroImageMobileSushiMinesPng from "../assets/game-hero-image/sushi-mines-mobile.png";
import gameScreenshotSushiMines1Png from "../assets/game-screenshot/sushi-mines-1.png";
import gameScreenshotSushiMines2Png from "../assets/game-screenshot/sushi-mines-2.png";
import gameScreenshotSushiMines3Png from "../assets/game-screenshot/sushi-mines-3.png";

import gameIconScratchMatchPng from "../assets/game-icon/scratch-match.png";
import gameCoverScratchMatchPng from "../assets/game-cover/scratch-match.png";
import gameCardScratchMatchPng from "../assets/game-card/scratch-match.png";
import gameHeroImageFgScratchMatchPng from "../assets/game-hero-image/scratch-match-fg.png";
import gameHeroImageBgScratchMatchPng from "../assets/game-hero-image/scratch-match-bg.png";
import gameHeroImageMobileScratchMatchPng from "../assets/game-hero-image/scratch-match-mobile.png";
import gameScreenshotScratchMatch1Png from "../assets/game-screenshot/scratch-match-1.png";
import gameScreenshotScratchMatch2Png from "../assets/game-screenshot/scratch-match-2.png";
import gameScreenshotScratchMatch3Png from "../assets/game-screenshot/scratch-match-3.png";

import gameIconLuckyFootballPng from "../assets/game-icon/lucky-football.png";
import gameCoverLuckyFootballPng from "../assets/game-cover/lucky-football.png";
import gameCardLuckyfootballPng from "../assets/game-card/lucky-football.png";
import gameHeroImageFgLuckyFootballPng from "../assets/game-hero-image/lucky-football-fg.png";
import gameHeroImageBgLuckyFootballPng from "../assets/game-hero-image/lucky-football-bg.png";
import gameHeroImageMobileLuckyFootballPng from "../assets/game-hero-image/lucky-football-mobile.png";
import gameScreenshotLuckyFootball1Png from "../assets/game-screenshot/lucky-football-1.png";
import gameScreenshotLuckyFootball2Png from "../assets/game-screenshot/lucky-football-2.png";
import gameScreenshotLuckyFootball3Png from "../assets/game-screenshot/lucky-football-3.png";

import gameIconGoBananasPng from "../assets/game-icon/go-bananas.png";
import gameCoverGoBananasPng from "../assets/game-cover/go-bananas.png";
import gameCardGoBananasPng from "../assets/game-card/go-bananas.png";
import gameHeroImageFgGoBananasPng from "../assets/game-hero-image/go-bananas-fg.png";
import gameHeroImageBgGoBananasPng from "../assets/game-hero-image/go-bananas-bg.png";
import gameHeroImageMobileGoBananasPng from "../assets/game-hero-image/go-bananas-mobile.png";
import gameScreenshotGoBananas1Png from "../assets/game-screenshot/go-bananas-1.png";
import gameScreenshotGoBananas2Png from "../assets/game-screenshot/go-bananas-2.png";
import gameScreenshotGoBananas3Png from "../assets/game-screenshot/go-bananas-3.png";

import gameIconRedHot7sPng from "../assets/game-icon/red-hot-7s.png";
import gameCoverRedHot7sPng from "../assets/game-cover/red-hot-7s.png";
import gameCardRedHot7sPng from "../assets/game-card/red-hot-7s.png";
import gameHeroImageFgRedHot7sPng from "../assets/game-hero-image/red-hot-7s-fg.png";
import gameHeroImageBgRedHot7sPng from "../assets/game-hero-image/red-hot-7s-bg.png";
import gameHeroImageMobileRedHot7sPng from "../assets/game-hero-image/red-hot-7s-mobile.png";
import gameScreenshotRedHot7s1Png from "../assets/game-screenshot/red-hot-7s-1.png";
import gameScreenshotRedHot7s2Png from "../assets/game-screenshot/red-hot-7s-2.png";
import gameScreenshotRedHot7s3Png from "../assets/game-screenshot/red-hot-7s-3.png";

import gameIconSuperDoublePng from "../assets/game-icon/super-double.png";
import gameCoverSuperDoublePng from "../assets/game-cover/super-double.png";
import gameCardSuperDoublePng from "../assets/game-card/super-double.png";
import gameHeroImageFgSuperDoublePng from "../assets/game-hero-image/super-double-fg.png";
import gameHeroImageBgSuperDoublePng from "../assets/game-hero-image/super-double-bg.png";
import gameHeroImageMobileSuperDoublePng from "../assets/game-hero-image/super-double-mobile.png";
import gameScreenshotSuperDouble1Png from "../assets/game-screenshot/super-double-1.png";
import gameScreenshotSuperDouble2Png from "../assets/game-screenshot/super-double-2.png";
import gameScreenshotSuperDouble3Png from "../assets/game-screenshot/super-double-3.png";

import gameIconGoForGoldPng from "../assets/game-icon/go-for-gold.png";
import gameCoverGoForGoldPng from "../assets/game-cover/go-for-gold.png";
import gameCardGoForGoldPng from "../assets/game-card/go-for-gold.png";
import gameHeroImageFgGoForGoldPng from "../assets/game-hero-image/go-for-gold-fg.png";
import gameHeroImageBgGoForGoldPng from "../assets/game-hero-image/go-for-gold-bg.png";
import gameHeroImageMobileGoForGoldPng from "../assets/game-hero-image/go-for-gold-mobile.png";
import gameScreenshotGoForGold1Png from "../assets/game-screenshot/go-for-gold-1.png";
import gameScreenshotGoForGold2Png from "../assets/game-screenshot/go-for-gold-2.png";
import gameScreenshotGoForGold3Png from "../assets/game-screenshot/go-for-gold-3.png";

import gameIconTreasureHuntMolesPng from "../assets/game-icon/treasure-hunt-moles.png";
import gameCoverTreasureHuntMolesPng from "../assets/game-cover/treasure-hunt-moles.png";
import gameCardTreasureHuntMolesPng from "../assets/game-card/treasure-hunt-moles.png";
import gameHeroImageFgTreasureHuntMolesPng from "../assets/game-hero-image/treasure-hunt-moles-fg.png";
import gameHeroImageBgTreasureHuntMolesPng from "../assets/game-hero-image/treasure-hunt-moles-bg.png";
import gameHeroImageMobileTreasureHuntMolesPng from "../assets/game-hero-image/treasure-hunt-moles-mobile.png";
import gameScreenshotTreasureHuntMoles1Png from "../assets/game-screenshot/treasure-hunt-moles-1.png";
import gameScreenshotTreasureHuntMoles2Png from "../assets/game-screenshot/treasure-hunt-moles-2.png";
import gameScreenshotTreasureHuntMoles3Png from "../assets/game-screenshot/treasure-hunt-moles-3.png";

import gameIconLostTreasurePng from "../assets/game-icon/lost-treasure.png";
import gameCoverLostTreasurePng from "../assets/game-cover/lost-treasure.png";
import gameCardLostTreasurePng from "../assets/game-card/lost-treasure.png";
import gameHeroImageFgLostTreasurePng from "../assets/game-hero-image/lost-treasure-fg.png";
import gameHeroImageBgLostTreasurePng from "../assets/game-hero-image/lost-treasure-bg.png";
import gameHeroImageMobileLostTreasurePng from "../assets/game-hero-image/lost-treasure-mobile.png";
import gameScreenshotLostTreasure1Png from "../assets/game-screenshot/lost-treasure-1.png";
import gameScreenshotLostTreasure2Png from "../assets/game-screenshot/lost-treasure-2.png";
import gameScreenshotLostTreasure3Png from "../assets/game-screenshot/lost-treasure-3.png";

import gameIconColorGameNewPng from "../assets/game-icon/color-game-new.png";
import gameCoverColorGameNewPng from "../assets/game-cover/color-game-new.png";
import gameCardColorGameNewPng from "../assets/game-card/color-game-new.png";
import gameHeroImageFgColorGameNewPng from "../assets/game-hero-image/color-game-new-fg.png";
import gameHeroImageBgColorGameNewPng from "../assets/game-hero-image/color-game-new-bg.png";
import gameHeroImageMobileColorGameNewPng from "../assets/game-hero-image/color-game-new-mobile.png";
import gameScreenshotColorGameNew1Png from "../assets/game-screenshot/color-game-new-1.png";
import gameScreenshotColorGameNew2Png from "../assets/game-screenshot/color-game-new-2.png";
import gameScreenshotColorGameNew3Png from "../assets/game-screenshot/color-game-new-3.png";

import gameIconLudoNewPng from "../assets/game-icon/ludo-new.png";
import gameCoverLudoNewPng from "../assets/game-cover/ludo-new.png";
import gameCardLudoNewPng from "../assets/game-card/ludo-new.png";
import gameHeroImageFgLudoNewPng from "../assets/game-hero-image/ludo-new-fg.png";
import gameHeroImageBgLudoNewPng from "../assets/game-hero-image/ludo-new-bg.png";
import gameHeroImageMobileLudoNewPng from "../assets/game-hero-image/ludo-mobile.png";
import gameScreenshotLudoNew1Png from "../assets/game-screenshot/ludo-new-1.png";
import gameScreenshotLudoNew2Png from "../assets/game-screenshot/ludo-new-2.png";
import gameScreenshotLudoNew3Png from "../assets/game-screenshot/ludo-new-3.png";

import gameIconSuperacePng from "../assets/game-icon/superace-new.png";
import gameCoverSuperacePng from "../assets/game-cover/superace-new.png";
import gameCardSuperacePng from "../assets/game-card/superace-new.png";
import gameHeroImageFgSuperacePng from "../assets/game-hero-image/superace-new-fg.png";
import gameHeroImageBgSuperacePng from "../assets/game-hero-image/superace-new-bg.png";
import gameHeroImageMobileSuperacePng from "../assets/game-hero-image/superace-new-mobile.png";
import gameScreenshotSuperace1Png from "../assets/game-screenshot/superace-new-1.png";
import gameScreenshotSuperace2Png from "../assets/game-screenshot/superace-new-2.png";
import gameScreenshotSuperace3Png from "../assets/game-screenshot/superace-new-3.png";

import gameIconFortuneGemsPng from "../assets/game-icon/FortuneGems-new.jpg";
import gameCoverFortuneGemsPng from "../assets/game-cover/FortuneGems-new.jpg";
import gameCardFortuneGemsPng from "../assets/game-card/FortuneGems-new.png";
import gameHeroImageFgFortuneGemsPng from "../assets/game-hero-image/FortuneGems-new-fg.png";
import gameHeroImageBgFortuneGemsPng from "../assets/game-hero-image/FortuneGems-new-bg.png";
import gameHeroImageMobileFortuneGemsPng from "../assets/game-hero-image/FortuneGems-new-mobile.png";
import gameScreenshotFortuneGems1Png from "../assets/game-screenshot/FortuneGems-new-1.png";
import gameScreenshotFortuneGems2Png from "../assets/game-screenshot/FortuneGems-new-2.png";
import gameScreenshotFortuneGems3Png from "../assets/game-screenshot/FortuneGems-new-3.png";

import feature1Svg from "../assets/feature-icons/feature-1.svg";
import feature2Svg from "../assets/feature-icons/feature-2.svg";
import feature3Svg from "../assets/feature-icons/feature-3.svg";
import feature4Svg from "../assets/feature-icons/feature-4.svg";
import AutoBetSvg from "../assets/feature-icons/AutoBet.svg";
import TwoBetSvg from "../assets/feature-icons/TwoBet.svg";
import FeaturedWildSvg from "../assets/feature-icons/FeaturedWild.svg";
import BuyFeatureSvg from "../assets/feature-icons/BuyFeature.svg";
import MultiplierSymbolSvg from "../assets/feature-icons/MultiplierSymbol.svg";
import PaylinesSvg from "../assets/feature-icons/Paylines.svg";
import ReelsSvg from "../assets/feature-icons/Reels.svg";
import IncreasingMultiplierSvg from "../assets/feature-icons/IncreasingMultiplier.svg";
import FreeSpinSvg from "../assets/feature-icons/FreeSpin.svg";
import JackpotSvg from "../assets/feature-icons/Jackpot.svg";
import LotteryTicketSvg from "../assets/feature-icons/LotteryTicket.svg";
import TurboGameSvg from "../assets/feature-icons/TurboGame.svg";
import CutFruitSvg from "../assets/feature-icons/CutFruit.svg";
import MultiplayerSvg from "../assets/feature-icons/Multiplayer.svg";
import FriendRoomSvg from "../assets/feature-icons/FriendRoom.svg";
import type { Game } from "./Game";

enum GameFeature {
  ExclusivePlatform = "Exclusive Platform",
  StrongOperability = "Strong Operability",
  ProvableFairness = "Provable Fairness",
  Bank = "Bank",
  DifficultyLevelSelectable = "Difficulty Level Selectable",
  AutoBet = "Auto Bet",
  TwoBet = "Two Bet",
  FeaturedWild = "Featured Wild",
  BuyFeature = "Buy Feature",
  MultiplierSymbol = "Multiplier Symbol",
  "5 Paylines" = "5 Paylines",
  "3×3 Reels" = "3×3 Reels",
  IncreasingMultiplier = "Increasing Multiplier",
  FreeSpin = "Free Spin",
  "1024 Paylines" = "1024 Paylines",
  "5×4 Reels" = "5×4 Reels",
  LotteryTicket = "Lottery Ticket",
  TurboGame = "Turbo Game",
  "1 Payline" = "1 Payline",
  Dice = "Dice",
  Jackpot = "Jackpot",
  Spaceship = "Spaceship",
  RaceCar = "Race Car",
  Rocket = "Rocket",
  Baseball = "Baseball",
  Tank = "Tank",
  OpenALootBox = "Open a loot box",
  CutFruit = "Cut Fruit",
  Monster = "Monster",
  Roulett = "Roulett",
  Multiplayer = "Multiplayer",
  Football = "Football",
  Monopoly = "Monopoly",
  FriendRoom = "Friends Room",
  Sushi = "Sushi",
}

export interface Label {
  icon: ImageMetadata;
  text: string;
}

const getFeatureLabel = (feature: GameFeature) => {
  const iconMap: Partial<Record<GameFeature, ImageMetadata>> = {
    [GameFeature.ExclusivePlatform]: feature1Svg,
    [GameFeature.StrongOperability]: feature2Svg,
    [GameFeature.ProvableFairness]: feature4Svg,
    [GameFeature.Bank]: feature3Svg,
    // todo
    [GameFeature.DifficultyLevelSelectable]: feature2Svg,
    [GameFeature.AutoBet]: AutoBetSvg,
    [GameFeature.TwoBet]: TwoBetSvg,
    [GameFeature.FeaturedWild]: FeaturedWildSvg,
    [GameFeature.BuyFeature]: BuyFeatureSvg,
    [GameFeature.MultiplierSymbol]: MultiplierSymbolSvg,
    [GameFeature["5 Paylines"]]: PaylinesSvg,
    [GameFeature["1 Payline"]]: PaylinesSvg,
    [GameFeature["1024 Paylines"]]: PaylinesSvg,
    [GameFeature["3×3 Reels"]]: ReelsSvg,
    [GameFeature["5×4 Reels"]]: ReelsSvg,
    [GameFeature.IncreasingMultiplier]: IncreasingMultiplierSvg,
    [GameFeature.FreeSpin]: FreeSpinSvg,
    [GameFeature.Roulett]: FreeSpinSvg,
    [GameFeature.Jackpot]: JackpotSvg,
    [GameFeature.LotteryTicket]: LotteryTicketSvg,
    [GameFeature.TurboGame]: TurboGameSvg,
    [GameFeature.CutFruit]: CutFruitSvg,
    [GameFeature.Multiplayer]: MultiplayerSvg,
    [GameFeature.FriendRoom]: FriendRoomSvg,
  };
  return { icon: iconMap[feature] ?? feature1Svg, text: feature };
};

const allGames: Record<
  string,
  Omit<Game, "rtp" | "features" | "category" | "weight" | "status" | "name" | "title" | "desc" | "releaseDate" | "cardBgColor" | "slug">
> = {
  "1698217738203": {
    id: "1698217738203",
    game_code: "gp_slot_54",
    icon: gameIconFortuneGemsPng,
    cover: gameCoverFortuneGemsPng,
    card: gameCardFortuneGemsPng,
    heroImageBg: gameHeroImageBgFortuneGemsPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgFortuneGemsPng,
    heroImageMobile: gameHeroImageMobileFortuneGemsPng,
    screenshots: [gameScreenshotFortuneGems1Png, gameScreenshotFortuneGems2Png, gameScreenshotFortuneGems3Png],
  },
  "1698217738024": {
    id: "1698217738024",
    game_code: "gp_slot_49",
    icon: gameIconSuperacePng,
    cover: gameCoverSuperacePng,
    card: gameCardSuperacePng,
    heroImageBg: gameHeroImageBgSuperacePng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgSuperacePng,
    heroImageMobile: gameHeroImageMobileSuperacePng,
    screenshots: [gameScreenshotSuperace1Png, gameScreenshotSuperace2Png, gameScreenshotSuperace3Png],
  },
  "1698217737977": {
    id: "1698217737977",
    game_code: "gp_table_42",
    icon: gameIconLudoNewPng,
    cover: gameCoverLudoNewPng,
    card: gameCardLudoNewPng,
    heroImageBg: gameHeroImageBgLudoNewPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgLudoNewPng,
    heroImageMobile: gameHeroImageMobileLudoNewPng,
    screenshots: [gameScreenshotLudoNew1Png, gameScreenshotLudoNew2Png, gameScreenshotLudoNew3Png],
  },
  "1698217737748": {
    id: "1698217737748",
    game_code: "gp_table_44",
    icon: gameIconColorGameNewPng,
    cover: gameCoverColorGameNewPng,
    card: gameCardColorGameNewPng,
    heroImageBg: gameHeroImageBgColorGameNewPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgColorGameNewPng,
    heroImageMobile: gameHeroImageMobileColorGameNewPng,
    screenshots: [gameScreenshotColorGameNew1Png, gameScreenshotColorGameNew2Png, gameScreenshotColorGameNew3Png],
  },
  "1698217736784": {
    id: "1698217736784",
    game_code: "gp_table_39",
    icon: gameIconSushiMinesPng,
    cover: gameCoverSushiMinesPng,
    card: gameCardSushiMinesPng,
    heroImageBg: gameHeroImageBgSushiMinesPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgSushiMinesPng,
    heroImageMobile: gameHeroImageMobileSushiMinesPng,
    screenshots: [gameScreenshotSushiMines1Png, gameScreenshotSushiMines2Png, gameScreenshotSushiMines3Png],
  },
  "1698217736840": {
    id: "1698217736840",
    game_code: "gp_lottery_41",
    icon: gameIconScratchMatchPng,
    cover: gameCoverScratchMatchPng,
    card: gameCardScratchMatchPng,
    heroImageBg: gameHeroImageBgScratchMatchPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgScratchMatchPng,
    heroImageMobile: gameHeroImageMobileScratchMatchPng,
    screenshots: [gameScreenshotScratchMatch1Png, gameScreenshotScratchMatch2Png, gameScreenshotScratchMatch3Png],
  },
  "1698217736648": {
    id: "1698217736648",
    game_code: "gp_slot_35",
    icon: gameIconYummyCarnivalPng,
    cover: gameCoverYummyCarnivalPng,
    card: gameCardYummyCarnivalPng,
    heroImageBg: gameHeroImageBgYummyCarnivalPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgYummyCarnivalPng,
    heroImageMobile: gameHeroImageMobileYummyCarnivalPng,
    screenshots: [gameScreenshotYummyCarnival1Png, gameScreenshotYummyCarnival2Png, gameScreenshotYummyCarnival3Png],
  },
  "1698217736598": {
    id: "1698217736598",
    game_code: "gp_table_32",
    icon: gameIconMonopolyPng,
    cover: gameCoverMonopolyPng,
    card: gameCardMonopolyPng,
    heroImageBg: gameHeroImageBgMonopolyPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgMonopolyPng,
    heroImageMobile: gameHeroImageMobileMonopolyPng,
    screenshots: [
      gameScreenshotMonopoly1Png,
      gameScreenshotMonopoly2Png,
      gameScreenshotMonopoly3Png,
      gameScreenshotMonopoly4Png,
    ],
  },
  "1698217736391": {
    id: "1698217736391",
    game_code: "gp_table_28",
    icon: gameIconBankHeistPng,
    cover: gameCoverBankHeistPng,
    card: gameCardBankHeistPng,
    heroImageBg: gameHeroImageBgBankHeistPng,
    heroImageBgColor: "#CDE3F9",
    heroImageFg: gameHeroImageFgBankHeistPng,
    heroImageMobile: gameHeroImageMobileBankHeistPng,
    screenshots: [gameScreenshotBankHeist1Png, gameScreenshotBankHeist2Png, gameScreenshotBankHeist3Png],
  },
  "1698217736812": {
    id: "1698217736812",
    game_code: "gp_table_44",
    icon: gameIconColorGamePng,
    cover: gameCoverColorGamePng,
    card: gameCardColorGamePng,
    heroImageBg: gameHeroImageBgColorGamePng,
    heroImageBgColor: "#48A2EA",
    heroImageFg: gameHeroImageFgColorGamePng,
    heroImageMobile: gameHeroImageMobileColorGamePng,
    screenshots: [gameScreenshotColorGame1Png, gameScreenshotColorGame2Png, gameScreenshotColorGame3Png],
  },
  "1698217736221": {
    id: "1698217736221",
    game_code: "gp_classic_23",
    icon: gameIconCrashPng,
    cover: gameCoverCrashPng,
    card: gameCardCrashPng,
    heroImageBg: gameHeroImageBgCrashPng,
    heroImageBgColor: "#A0DEF2",
    heroImageFg: gameHeroImageFgCrashPng,
    heroImageMobile: gameHeroImageMobileCrashPng,
    screenshots: [gameScreenshotCrash1Png, gameScreenshotCrash2Png, gameScreenshotCrash3Png],
  },
  // "1698217736374": {
  //   id: "1698217736374",
  //   icon: gameIconCricketCrashPng,
  //   cover: gameCoverCricketCrashPng,
  //   card: gameCardCricketCrashPng,
  //   heroImageBg: gameHeroImageBgCricketCrashPng,
  //   heroImageBgColor: "#9BE1FD",
  //   heroImageFg: gameHeroImageFgCricketCrashPng,
  //   heroImageMobile: gameHeroImageMobileCricketCrashPng,
  //   screenshots: [gameScreenshotCricketCrash1Png, gameScreenshotCricketCrash2Png, gameScreenshotCricketCrash3Png],
  // },
  "1698217736198": {
    id: "1698217736198",
    game_code: "gp_classic_15",
    icon: gameIconDicePng,
    cover: gameCoverDicePng,
    card: gameCardDicePng,
    heroImageBg: gameHeroImageBgDicePng,
    heroImageBgColor: "#94D4E4",
    heroImageFg: gameHeroImageFgDicePng,
    heroImageMobile: gameHeroImageMobileDicePng,
    screenshots: [gameScreenshotDice1Png, gameScreenshotDice2Png, gameScreenshotDice3Png],
  },
  "1698217736200": {
    id: "1698217736200",
    game_code: "gp_classic_17",
    icon: gameIconDoublePng,
    cover: gameCoverDoublePng,
    card: gameCardDoublePng,
    heroImageBg: gameHeroImageBgDoublePng,
    heroImageBgColor: "#BFDDFD",
    heroImageFg: gameHeroImageFgDoublePng,
    heroImageMobile: gameHeroImageMobileDoublePng,
    screenshots: [gameScreenshotDouble1Png, gameScreenshotDouble2Png, gameScreenshotDouble3Png],
  },

  "1698217736201": {
    id: "1698217736201",
    game_code: "gp_classic_18",
    icon: gameIconFierybotPng,
    cover: gameCoverFierybotPng,
    card: gameCardFierybotPng,
    heroImageBg: gameHeroImageBgFierybotPng,
    heroImageBgColor: "#33C4FA",
    heroImageFg: gameHeroImageFgFierybotPng,
    heroImageMobile: gameHeroImageMobileFierybotPng,
    screenshots: [gameScreenshotFierybot1Png, gameScreenshotFierybot2Png, gameScreenshotFierybot3Png],
  },
  "1698217736357": {
    id: "1698217736357",
    game_code: "gp_electrical_30",
    icon: gameIconFastFuriousPng,
    cover: gameCoverFastFuriousPng,
    card: gameCardFastFuriousPng,
    heroImageBg: gameHeroImageBgFastFuriousPng,
    heroImageBgColor: "#33C4FA",
    heroImageFg: gameHeroImageFgFastFuriousPng,
    heroImageMobile: gameHeroImageMobileFastFuriousPng,
    screenshots: [gameScreenshotFastFurious1Png, gameScreenshotFastFurious2Png, gameScreenshotFastFurious3Png],
  },
  "1698217736480": {
    id: "1698217736480",
    game_code: "gp_sports_33",
    icon: gameIconFootballXPng,
    cover: gameCoverFootballXPng,
    card: gameCardFootballXPng,
    heroImageBg: gameHeroImageBgFootballXPng,
    heroImageBgColor: "#93D4F7",
    heroImageFg: gameHeroImageFgFootballXPng,
    heroImageMobile: gameHeroImageMobileFootballXPng,
    screenshots: [gameScreenshotFootballX1Png, gameScreenshotFootballX2Png, gameScreenshotFootballX3Png],
  },
  "1698217736234": {
    id: "1698217736234",
    game_code: "gp_classic_22",
    icon: gameIconKenoPng,
    cover: gameCoverKenoPng,
    card: gameCardKenoPng,
    heroImageBg: gameHeroImageBgKenoPng,
    heroImageBgColor: "#BFDDFD",
    heroImageFg: gameHeroImageFgKenoPng,
    heroImageMobile: gameHeroImageMobileKenoPng,
    screenshots: [gameScreenshotKeno1Png, gameScreenshotKeno2Png, gameScreenshotKeno3Png],
  },
  "1698217736197": {
    id: "1698217736197",
    game_code: "gp_classic_14",
    icon: gameIconLimboPng,
    cover: gameCoverLimboPng,
    card: gameCardLimboPng,
    heroImageBg: gameHeroImageBgLimboPng,
    heroImageBgColor: "#A0DEF2",
    heroImageFg: gameHeroImageFgLimboPng,
    heroImageMobile: gameHeroImageMobileLimboPng,
    screenshots: [gameScreenshotLimbo1Png, gameScreenshotLimbo2Png, gameScreenshotLimbo3Png],
  },
  "1698217736189": {
    id: "1698217736189",
    game_code: "gp_electrical_6",
    icon: gameIconLuckyTanksPng,
    cover: gameCoverLuckyTanksPng,
    card: gameCardLuckyTanksPng,
    heroImageBg: gameHeroImageBgLuckyTanksPng,
    heroImageBgColor: "#D5DCDD",
    heroImageFg: gameHeroImageFgLuckyTanksPng,
    heroImageMobile: gameHeroImageMobileLuckyTanksPng,
    screenshots: [gameScreenshotLuckyTanks1Png, gameScreenshotLuckyTanks2Png, gameScreenshotLuckyTanks3Png],
  },
  "1698217736199": {
    id: "1698217736199",
    game_code: "gp_classic_16",
    icon: gameIconMinesPng,
    cover: gameCoverMinesPng,
    card: gameCardMinesPng,
    heroImageBg: gameHeroImageBgMinesPng,
    heroImageBgColor: "#BCC5B3",
    heroImageFg: gameHeroImageFgMinesPng,
    heroImageMobile: gameHeroImageMobileMinesPng,
    screenshots: [gameScreenshotMines1Png, gameScreenshotMines2Png, gameScreenshotMines3Png],
  },
  // "1698217736190": {
  //   id: "1698217736190",
  //   icon: gameIconNeedForXPng,
  //   cover: gameCoverNeedForXPng,
  //   card: gameCardNeedForXPng,
  //   heroImageBg: gameHeroImageBgNeedForXPng,
  //   heroImageBgColor: "#B9B0F8",
  //   heroImageFg: gameHeroImageFgNeedForXPng,
  //   heroImageMobile: gameHeroImageMobileNeedForXPng,
  //   screenshots: [gameScreenshotNeedForX1Png, gameScreenshotNeedForX2Png, gameScreenshotNeedForX3Png],
  // },
  "1698217736266": {
    id: "1698217736266",
    game_code: "gp_table_27",
    icon: gameIconNinjaCrashPng,
    cover: gameCoverNinjaCrashPng,
    card: gameCardNinjaCrashPng,
    heroImageBg: gameHeroImageBgNinjaCrashPng,
    heroImageBgColor: "#BFDDFD",
    heroImageFg: gameHeroImageFgNinjaCrashPng,
    heroImageMobile: gameHeroImageMobileNinjaCrashPng,
    screenshots: [gameScreenshotNinjaCrash1Png, gameScreenshotNinjaCrash2Png, gameScreenshotNinjaCrash3Png],
  },
  "1698217736500": {
    id: "1698217736500",
    game_code: "gp_table_34",
    icon: gameIconPandaCrashPng,
    cover: gameCoverPandaCrashPng,
    card: gameCardPandaCrashPng,
    heroImageBg: gameHeroImageBgPandaCrashPng,
    heroImageBgColor: "#9CE3FA",
    heroImageFg: gameHeroImageFgPandaCrashPng,
    heroImageMobile: gameHeroImageMobilePandaCrashPng,
    screenshots: [gameScreenshotPandaCrash1Png, gameScreenshotPandaCrash2Png, gameScreenshotPandaCrash3Png],
  },
  "1698217736300": {
    id: "1698217736300",
    game_code: "gp_classic_21",
    icon: gameIconRingPng,
    cover: gameCoverRingPng,
    card: gameCardRingPng,
    heroImageBg: gameHeroImageBgRingPng,
    heroImageBgColor: "#94D4E4",
    heroImageFg: gameHeroImageFgRingPng,
    heroImageMobile: gameHeroImageMobileRingPng,
    screenshots: [gameScreenshotRing1Png, gameScreenshotRing2Png, gameScreenshotRing3Png],
  },
  "1698217737023": {
    id: "1698217737023",
    game_code: "gp_lottery_43",
    icon: gameIconLuckyFootballPng,
    cover: gameCoverLuckyFootballPng,
    card: gameCardLuckyfootballPng,
    heroImageBg: gameHeroImageBgLuckyFootballPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgLuckyFootballPng,
    heroImageMobile: gameHeroImageMobileLuckyFootballPng,
    screenshots: [gameScreenshotLuckyFootball1Png, gameScreenshotLuckyFootball2Png, gameScreenshotLuckyFootball3Png],
  },
  "1698217737122": {
    id: "1698217737122",
    game_code: "gp_lottery_46",
    icon: gameIconRedHot7sPng,
    cover: gameCoverRedHot7sPng,
    card: gameCardRedHot7sPng,
    heroImageBg: gameHeroImageBgRedHot7sPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgRedHot7sPng,
    heroImageMobile: gameHeroImageMobileRedHot7sPng,
    screenshots: [gameScreenshotRedHot7s1Png, gameScreenshotRedHot7s2Png, gameScreenshotRedHot7s3Png],
  },
  "1698217737088": {
    id: "1698217737088",
    game_code: "gp_lottery_45",
    icon: gameIconGoBananasPng,
    cover: gameCoverGoBananasPng,
    card: gameCardGoBananasPng,
    heroImageBg: gameHeroImageBgGoBananasPng,
    heroImageBgColor: "#FF84EC",
    heroImageFg: gameHeroImageFgGoBananasPng,
    heroImageMobile: gameHeroImageMobileGoBananasPng,
    screenshots: [gameScreenshotGoBananas1Png, gameScreenshotGoBananas2Png, gameScreenshotGoBananas3Png],
  },
  "1698217737260": {
    id: "1698217737260",
    game_code: "gp_lottery_48",
    icon: gameIconSuperDoublePng,
    cover: gameCoverSuperDoublePng,
    card: gameCardSuperDoublePng,
    heroImageFg: gameHeroImageFgSuperDoublePng,
    heroImageBg: gameHeroImageBgSuperDoublePng,
    heroImageBgColor: "",
    heroImageMobile: gameHeroImageMobileSuperDoublePng,
    screenshots: [gameScreenshotSuperDouble1Png, gameScreenshotSuperDouble2Png, gameScreenshotSuperDouble3Png],
  },
  "1698217737224": {
    id: "1698217737224",
    game_code: "gp_lottery_47",
    icon: gameIconGoForGoldPng,
    cover: gameCoverGoForGoldPng,
    card: gameCardGoForGoldPng,
    heroImageFg: gameHeroImageFgGoForGoldPng,
    heroImageBg: gameHeroImageBgGoForGoldPng,
    heroImageBgColor: "",
    heroImageMobile: gameHeroImageMobileGoForGoldPng,
    screenshots: [gameScreenshotGoForGold1Png, gameScreenshotGoForGold2Png, gameScreenshotGoForGold3Png],
  },  
  "1698217737520": {
    id: "1698217737520",
    game_code: "gp_table_40",
    icon: gameIconTreasureHuntMolesPng,
    cover: gameCoverTreasureHuntMolesPng,
    card: gameCardTreasureHuntMolesPng,
    heroImageFg: gameHeroImageFgTreasureHuntMolesPng,
    heroImageBg: gameHeroImageBgTreasureHuntMolesPng,
    heroImageBgColor: "",
    heroImageMobile: gameHeroImageMobileTreasureHuntMolesPng,
    screenshots: [
      gameScreenshotTreasureHuntMoles1Png,
      gameScreenshotTreasureHuntMoles2Png,
      gameScreenshotTreasureHuntMoles3Png,
    ],
  },
  "1698217737558": {
    id: "1698217737558",
    game_code: "gp_table_36",
    icon: gameIconLostTreasurePng,
    cover: gameCoverLostTreasurePng,
    card: gameCardLostTreasurePng,
    heroImageFg: gameHeroImageFgLostTreasurePng,
    heroImageBg: gameHeroImageBgLostTreasurePng,
    heroImageBgColor: "",
    heroImageMobile: gameHeroImageMobileLostTreasurePng,
    screenshots: [gameScreenshotLostTreasure1Png, gameScreenshotLostTreasure2Png, gameScreenshotLostTreasure3Png],
  },
  "1698217739150": {
    id: "1698217739150",
    game_code: "gp_classic_67",
    icon: gameIconRockPapaerScissorsPng,
    cover: gameCoverRockPapaerScissorsPng,
    card: gameCardRockPapaerScissorsPng,
    heroImageBg: gameHeroImageBgRockPapaerScissorsPng,
    heroImageBgColor: "#94D4E4",
    heroImageFg: gameHeroImageFgRockPapaerScissorsPng,
    heroImageMobile: gameHeroImageMobileRockPapaerScissorsPng,
    screenshots: [gameScreenshotRockPapaerScissors1Png, gameScreenshotRockPapaerScissors2Png, gameScreenshotRockPapaerScissors3Png],
  },
  "1698217739218":{
    id: "1698217739218",
    game_code: "",
    icon: gameIconInbetweenPng,
    cover: gameCoverInbetweenPng,
    card: gameCardInbetweenPng,
    heroImageFg: gameHeroImageFgInbetweenPng,
    heroImageBg: gameHeroImageBgInbetweenPng,
    heroImageBgColor: "",
    heroImageMobile: gameHeroImageMobileInbetweenPng,
    screenshots: [gameScreenshotInbetween1Png, gameScreenshotInbetween2Png, gameScreenshotInbetween3Png, gameScreenshotInbetween4Png],
  },
  "1698217739399":{
    id: "1698217739399",
    game_code: "gp_lottery_68",
    icon: gameIconGoLabubuPng,
    cover: gameCoverGoLabubuPng,
    card: gameCardGoLabubuPng,
    heroImageFg: gameHeroImageFgGoLabubuPng,
    heroImageBg: gameHeroImageBgGoLabubuPng,
    heroImageBgColor: "",
    heroImageMobile: gameHeroImageMobileGoLabubuPng,
    screenshots: [gameScreenshotGoLabubu1Png, gameScreenshotGoLabubu2Png,gameScreenshotGoLabubu3Png],
  },
  "1698217740101":{
    id:"1698217740101",
    game_code: "gp_lottery_69",
    icon:gameIconLabubuForSugarPng,
    cover:gameCoverLabubuForSugarPng,
    card:gameCardLabubuForSugarPng,
    heroImageFg:gameHeroImageFgLabubuForSugarPng,
    heroImageBg:gameHeroImageBgLabubuForSugarPng,
    heroImageBgColor:"",
    heroImageMobile:gameHeroImageMobileLabubuForSugarPng,
    screenshots:[gameScreenshotLabubuForSugar1Png,gameScreenshotLabubuForSugar2Png,gameScreenshotLabubuForSugar3Png],
  },
  "1698217740553":{
    id:"1698217740553",
    game_code: "gp_classic_70",
    icon:gameIconLabubuMinesPng,
    cover:gameCoverLabubuMinesPng,
    card:gameCardLabubuMinesPng,
    heroImageFg:gameHeroImageFgLabubuMinesPng,
    heroImageBg:gameHeroImageBgLabubuMinesPng,
    heroImageBgColor:"",
    heroImageMobile:gameHeroImageMobileLabubuMinesPng,
    screenshots:[gameScreenshotLabubuMines1Png,gameScreenshotLabubuMines2Png,gameScreenshotLabubuMines3Png],
  }
};

function transExcelDateToTimestamp(excelDate: number) {
  return new Date(1900, 0, 1).getTime() + (excelDate - 2) * 24 * 60 * 60 * 1000;
}

// 生成唯一的slug，处理重复名称
function generateUniqueSlug(gamesData: any[]): any[] {
  const activeGames = gamesData.filter((game) => game.status === 1);
  const slugCounts: Record<string, number> = {};

  return activeGames.map((item) => {
    const localGame = allGames[item.id];
    const baseSlug = generateGameSlug(item.name, item.id);

    // 检查是否有重复的slug
    if (slugCounts[baseSlug]) {
      slugCounts[baseSlug]++;
      // 为重复的slug添加序号
      const uniqueSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
      return {
        ...item,
        slug: uniqueSlug,
        icon: item.icon || localGame?.icon,
        cover: item.cover || localGame?.cover,
        card: item.card || localGame?.card,
        heroImageBgColor: localGame?.heroImageBgColor || "#94D4E4",
        heroImageBg: item.heroImageBg || localGame?.heroImageBg,
        heroImageFg: item.heroImageFg || localGame?.heroImageFg,
        heroImageMobile: item.heroImageMobile || localGame?.heroImageMobile,
        screenshots: item?.screenshots.split(",") || localGame?.screenshots || [],
        features: item?.features.map((feature: string) => getFeatureLabel(feature as GameFeature)) || [],
        releaseDate: transExcelDateToTimestamp(item.releaseDate),
        shareImage: item.sharepic, // 添加分享图片字段
      };
    } else {
      slugCounts[baseSlug] = 1;
      return {
        ...item,
        slug: baseSlug,
        icon: item.icon || localGame?.icon,
        cover: item.cover || localGame?.cover,
        card: item.card || localGame?.card,
        heroImageBgColor: localGame?.heroImageBgColor || "#94D4E4",
        heroImageBg: item.heroImageBg || localGame?.heroImageBg,
        heroImageFg: item.heroImageFg || localGame?.heroImageFg,
        heroImageMobile: item.heroImageMobile || localGame?.heroImageMobile,
        screenshots: item?.screenshots.split(",") || localGame?.screenshots || [],
        features: item?.features.map((feature: string) => getFeatureLabel(feature as GameFeature)) || [],
        releaseDate: transExcelDateToTimestamp(item.releaseDate),
        shareImage: item.sharepic, // 添加分享图片字段
      };
    }
  });
}

export const games = generateUniqueSlug(gamesData);

export function gameCompare(a: Game, b: Game): number {
  if (a.releaseDate === b.releaseDate) {
    return a.name.localeCompare(b.name);
  }
  return b.releaseDate - a.releaseDate;
}

export const sortedGames = games.slice().sort(gameCompare);

export const gameCarousels = sortedGames
  .slice(0, 3)
  .map(({ id, slug, heroImageBg, heroImageBgColor, heroImageFg, heroImageMobile, icon }) => ({
    id,
    slug,
    icon,
    heroImageBg,
    heroImageBgColor,
    heroImageFg,
    heroImageMobile,
  }));

export const gamesForGrid = sortedGames.slice(0, 12).map((game) => game.icon);
