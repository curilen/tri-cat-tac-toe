export enum GAME_OPTIONS_STAGES {
  Mode = 'mode',
  Difficulty = 'difficulty',
  ChooseToken = 'chooseToken',
}

export const GAME_STAGE_DEFAULT = GAME_OPTIONS_STAGES.Mode;

export enum GAME_OPTIONS_MODE {
  OneVSOne = 'OneVSOne',
  OneVSCPU = 'OneVSCPU',
}

export enum GAME_OPTIONS_DIFFICULTY {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export const GAME_TOKENS: IGameTokens = {
  X: 'X',
  O: 'O',
};

export const GAME_PLAYERS_DEFAULT: IGamePlayers[] = [
  {
    id: 'player-one',
    displayName: 'Player 1',
    won: 0,
  },
  {
    id: 'player-two',
    displayName: 'Player 2',
    won: 0,
  },
];

export enum GAME_WINNING_TYPE_LINES {
  COLUMN,
  ROWS,
  LEF_DIAGONAL,
  RIGHT_DIAGONAL,
}
