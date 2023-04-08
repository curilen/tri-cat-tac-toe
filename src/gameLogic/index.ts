import GameOptions from './gameOptions';

export default class GameLogic {
  private _gameOptions?: GameOptions;

  constructor() {
    this._gameOptions = new GameOptions();
  }

  public get gameOptions() {
    return this._gameOptions;
  }

  public get canPlay() {
    return this._gameOptions?.isComplete;
  }
}
