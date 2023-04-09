import GameOptionsLogic from './gameOptions';

export default class GameLogic {
  private _gameOptions?: GameOptionsLogic;

  constructor() {
    this._gameOptions = new GameOptionsLogic();
  }

  public get gameOptions() {
    return this._gameOptions;
  }

  public get canPlay() {
    return this._gameOptions?.isComplete;
  }

  public clone(): GameLogic {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}
