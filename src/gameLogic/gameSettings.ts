import { Vector3 } from 'three';

import {
  GAME_TOKEN_FIRST_XAXIS,
  GAME_TOKEN_FIRST_YAXIS,
  GAME_TOKEN_ZAXIS_MIN,
} from '@/constants/positions';

interface IGameSettingsLogic {
  totalToken: number;
  getTokenList: () => IGameTokenElement[];
}

export default class GameSettingsLogic implements IGameSettingsLogic {
  public readonly totalToken = 9;
  private readonly totalRows = 3;
  private readonly totalColumns = Math.ceil(this.totalToken / this.totalRows);

  public getTokenList() {
    const tokenList: IGameTokenElement[] = [];
    let lastXAxis = GAME_TOKEN_FIRST_XAXIS * 2;
    let lastYAxis = GAME_TOKEN_FIRST_YAXIS * 2;

    for (let i = 0; i < this.totalToken; i++) {
      const colNumber = (i + 1) % this.totalColumns;
      const isLastCol = colNumber === 0;

      const xAxis = lastXAxis - GAME_TOKEN_FIRST_XAXIS;
      const yAxis = lastYAxis - GAME_TOKEN_FIRST_YAXIS;

      if (isLastCol) {
        lastXAxis = GAME_TOKEN_FIRST_XAXIS * 2;
        lastYAxis = yAxis;
      } else {
        lastXAxis = xAxis;
      }

      const position = new Vector3(xAxis, yAxis, GAME_TOKEN_ZAXIS_MIN);
      tokenList.push({
        order: i + 1,
        position,
      });
    }

    return tokenList;
  }
}
