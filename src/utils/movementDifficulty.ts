import {
  GAME_OPTIONS_DIFFICULTY,
  GAME_PLAYERS_DEFAULT,
  GAME_PLAYER_CPU_ID,
  GAME_TOKENS,
} from '@/constants/game';
import { validateWinner } from '@/utils/winner';

type ITokenList = Array<keyof IGameTokens | null>;
interface INextMoveBase {
  tokenList: ITokenList;
  victoryPatterns: number[][];
  cpuPlayer: keyof IGameTokens;
}
interface INextMoveDifficulty extends INextMoveBase {
  difficulty: GAME_OPTIONS_DIFFICULTY;
}

interface ILevelMove extends INextMoveBase {
  availableIdxList: number[];
  secondPlayer: keyof IGameTokens;
}

export const getNextMoveDifficulty = ({
  tokenList,
  ...params
}: INextMoveDifficulty): number => {
  const availableIdxList = getAvailableSpots(tokenList);
  const isMinToken = tokenList.length - availableIdxList.length <= 2;
  if (availableIdxList.length === 1 || isMinToken) {
    return getEasyLevelMove(tokenList);
  }

  const secondPlayer =
    GAME_PLAYERS_DEFAULT.find((e) => e.token !== params.cpuPlayer)?.token ||
    GAME_PLAYERS_DEFAULT.find((e) => e.id !== GAME_PLAYER_CPU_ID)?.token ||
    (GAME_TOKENS.O as keyof IGameTokens);

  switch (params.difficulty) {
    case GAME_OPTIONS_DIFFICULTY.Easy:
      return getEasyLevelMove(tokenList);
    case GAME_OPTIONS_DIFFICULTY.Medium:
      return getMidLevelMove({
        ...params,
        tokenList,
        availableIdxList,
        secondPlayer,
      });
    case GAME_OPTIONS_DIFFICULTY.Hard:
      return getHardLevelMove({
        ...params,
        tokenList,
        availableIdxList,
        secondPlayer,
      });
    default:
      return getEasyLevelMove(tokenList);
  }
};

const getEasyLevelMove = (tokenList: ITokenList): number => {
  if (tokenList.length < 1) {
    return -1;
  }
  const availableIdx = getAvailableSpots(tokenList);
  if (availableIdx.length < 1) {
    return -1;
  }
  const randomIdx = Math.floor(Math.random() * availableIdx.length);
  return availableIdx[randomIdx];
};

const getMidLevelMove = ({
  tokenList,
  availableIdxList,
  victoryPatterns,
  cpuPlayer,
  secondPlayer,
}: ILevelMove) => {
  // CPU validation
  for (let pos = 0; pos < availableIdxList.length; pos++) {
    const opTokens = [...tokenList];
    opTokens[availableIdxList[pos]] = cpuPlayer;
    const { isWinner } = validateWinner(opTokens, victoryPatterns, cpuPlayer);
    if (isWinner) {
      return availableIdxList[pos];
    }
  }

  // Oponent validation
  for (let pos = 0; pos < availableIdxList.length; pos++) {
    const opTokens = [...tokenList];
    opTokens[availableIdxList[pos]] = secondPlayer;
    const { isWinner } = validateWinner(
      opTokens,
      victoryPatterns,
      secondPlayer
    );
    if (isWinner) {
      return availableIdxList[pos];
    }
  }

  return getEasyLevelMove(tokenList);
};

const getHardLevelMove = (params: ILevelMove) => {
  return getMidLevelMove(params);
};

const getAvailableSpots = (tokenList: ITokenList) => {
  const availableIdx: number[] = [];
  for (let i = 0; i < tokenList.length; i++) {
    if (tokenList[i] === null) {
      availableIdx.push(i);
    }
  }
  return availableIdx;
};
