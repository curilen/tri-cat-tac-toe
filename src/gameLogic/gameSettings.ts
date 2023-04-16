import { Vector3 } from 'three';

import {
  BOARD_PADDING,
  GAME_TOKEN_BOX_SIZE,
  GAME_TOKEN_SPACE_BETWEEN,
  GAME_TOKEN_ZAXIS_MIN,
} from '@/constants/positions';
import { GAME_WINNING_TYPE_LINES } from '@/constants/game';

interface IGameSettingsLogic {
  totalToken: number;
  victoryPatterns: number[][];
  getTokenList: () => IGameTokenElement[];
}

export default class GameSettingsLogic implements IGameSettingsLogic {
  public readonly totalToken = 9;
  private readonly _totalRows = 3;
  private readonly _totalColumns = Math.ceil(this.totalToken / this._totalRows);
  private _victoryPatterns: number[][] = [];

  public get victoryPatterns() {
    return this._victoryPatterns;
  }

  public get totalColumns() {
    return this._totalColumns;
  }

  public get totalRows() {
    return this._totalRows;
  }

  public get boardSize() {
    return (
      GAME_TOKEN_BOX_SIZE * this.totalColumns +
      GAME_TOKEN_SPACE_BETWEEN * (this.totalColumns - 1) +
      BOARD_PADDING * 2
    );
  }

  public get incrementDistnceToken() {
    return GAME_TOKEN_SPACE_BETWEEN + GAME_TOKEN_BOX_SIZE;
  }

  public getTokenList() {
    const tokenList: IGameTokenElement[] = [];
    const firstX = -(
      GAME_TOKEN_BOX_SIZE +
      this.totalColumns +
      this.totalColumns * 0.8
    );
    let lastX = firstX;
    let lastY = this.boardSize / 2 - BOARD_PADDING - GAME_TOKEN_BOX_SIZE / 2;

    for (let i = 0; i < this.totalToken; i++) {
      const colNumber = (i + 1) % this._totalColumns;
      const isLastCol = colNumber === 0;
      const xAxis = lastX + this.incrementDistnceToken;

      const position = new Vector3(xAxis, lastY, GAME_TOKEN_ZAXIS_MIN);
      tokenList.push({
        order: i + 1,
        position,
      });

      if (isLastCol) {
        lastX = firstX;
        lastY -= this.incrementDistnceToken;
      } else {
        lastX = xAxis;
      }
    }

    return tokenList;
  }

  public createVictoryPatterns() {
    const victoryPatterns: number[][] = [];

    for (let c = 0; c < this._totalColumns; c++) {
      const colsWinner = Array.from(
        { length: this._totalRows },
        (_, index) => c + index * this._totalColumns
      );
      victoryPatterns.push(colsWinner);
    }

    const lefDiagonal: number[] = [];
    const rightDiagonal: number[] = [];
    for (let r = 0; r < this._totalRows; r++) {
      const rowsWinner = Array.from(
        { length: this._totalColumns },
        (_, index) => r * this._totalColumns + index
      );
      victoryPatterns.push(rowsWinner);
      lefDiagonal.push(r * this._totalColumns + r);
      rightDiagonal.push((this._totalColumns - 1) * (r + 1));
    }
    victoryPatterns.push(lefDiagonal);
    victoryPatterns.push(rightDiagonal);

    this._victoryPatterns = victoryPatterns.sort();
  }

  public winnerBeVerified(movesPlayer: number) {
    return movesPlayer >= this._totalColumns || movesPlayer >= this._totalRows;
  }

  public getWinningTypeBoard(
    winnerPositions: number[]
  ): GAME_WINNING_TYPE_LINES | null {
    //Rows
    if (winnerPositions[1] === winnerPositions[0] + 1) {
      return GAME_WINNING_TYPE_LINES.ROWS;
    }

    //Column
    if (winnerPositions[1] === winnerPositions[0] + this._totalColumns) {
      return GAME_WINNING_TYPE_LINES.COLUMN;
    }

    if (winnerPositions[1] === this._totalColumns + 1) {
      if (winnerPositions[0] === 0) {
        return GAME_WINNING_TYPE_LINES.LEF_DIAGONAL;
      } else {
        return GAME_WINNING_TYPE_LINES.RIGHT_DIAGONAL;
      }
    }
    return null;
  }
}
