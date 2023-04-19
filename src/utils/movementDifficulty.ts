import { GAME_OPTIONS_DIFFICULTY } from '@/constants/game';

type ITokenList = Array<keyof IGameTokens | null>;

export const getNextMoveDifficulty = (
  difficulty: GAME_OPTIONS_DIFFICULTY,
  tokenList: ITokenList
): number => {
  switch (difficulty) {
    case GAME_OPTIONS_DIFFICULTY.Easy:
      return getEasyMove(tokenList);
    case GAME_OPTIONS_DIFFICULTY.Medium:
      return getMediumMove(tokenList);
    case GAME_OPTIONS_DIFFICULTY.Hard:
      return getHardMove(tokenList);
    default:
      return getEasyMove(tokenList);
  }
};

const getEasyMove = (tokenList: ITokenList): number => {
  if (tokenList.length < 1) {
    return -1;
  }
  const availableIdx: number[] = [];
  for (let i = 0; i < tokenList.length; i++) {
    if (tokenList[i] === null) {
      availableIdx.push(i);
    }
  }

  if (availableIdx.length < 1) {
    return -1;
  }
  const randomIdx = Math.floor(Math.random() * availableIdx.length);
  return availableIdx[randomIdx];
};

const getMediumMove = (tokenList: ITokenList): number => {
  moveEvaluation(tokenList);
  return getEasyMove(tokenList);
};

const getHardMove = (tokenList: ITokenList): number => {
  moveEvaluation(tokenList);
  return getEasyMove(tokenList);
};

const moveEvaluation = (tokenList: ITokenList) => {
  // For initial selection
  if (tokenList.every((t) => t === null)) {
    return getEasyMove(tokenList);
  }
};
