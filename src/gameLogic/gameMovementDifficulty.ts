import { GAME_OPTIONS_DIFFICULTY } from '@/constants/game';

export default class GameMovementDifficulty {
  private currentDifficulty: GAME_OPTIONS_DIFFICULTY =
    GAME_OPTIONS_DIFFICULTY.Easy;

  constructor(_newDifficulty?: GAME_OPTIONS_DIFFICULTY) {
    if (_newDifficulty !== undefined) {
      this.currentDifficulty = _newDifficulty;
    }
  }

  public getNextMove(tokenList: Array<keyof IGameTokens | null>): number {
    const availableIdx: number[] = [];
    for (let i = 0; i < tokenList.length; i++) {
      if (tokenList[i] === null) {
        availableIdx.push(i);
      }
    }

    switch (this.currentDifficulty) {
      case GAME_OPTIONS_DIFFICULTY.Easy:
        return this.getEasyMove(availableIdx);
      default:
        return this.getEasyMove(availableIdx);
    }
  }

  private getEasyMove(availableIdx: number[]): number {
    if (availableIdx.length < 1) {
      return -1;
    }
    const randomIdx = Math.floor(Math.random() * availableIdx.length);
    return availableIdx[randomIdx];
  }
}
