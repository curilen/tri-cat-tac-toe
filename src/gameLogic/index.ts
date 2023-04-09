import GameOptionsLogic from './gameOptions';

export default class GameLogic {
  private _gameOptions?: GameOptionsLogic;
  private _currentTurn?: IGamePlayers;

  constructor() {
    this._gameOptions = new GameOptionsLogic();
  }

  public get currentTurn() {
    return this._currentTurn;
  }

  private set currentTurn(player: IGamePlayers | undefined) {
    this._currentTurn = player;
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

  public startGame() {
    if (!this.canPlay || !this.gameOptions?.players) {
      return false;
    }
    this._currentTurn = this.gameOptions?.players[Math.round(Math.random())];
  }
}
