import GameOptionsLogic from './gameOptions';
import GameSettingsLogic from './gameSettings';

export default class GameLogic {
  private _gameOptions?: GameOptionsLogic;
  private _currentTurn?: IGamePlayers;
  private _gameSettings?: GameSettingsLogic;
  private _tokenSelected: Array<keyof IGameTokens | null> = [];

  constructor() {
    this._gameOptions = new GameOptionsLogic();
    this._gameSettings = new GameSettingsLogic();
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

  public get gameSettings() {
    return this._gameSettings;
  }

  public get tokenSelected() {
    return this._tokenSelected;
  }

  public clone(): GameLogic {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  public startGame() {
    if (!this.canPlay || !this.gameOptions?.players) {
      return false;
    }
    this._currentTurn = this.gameOptions?.players[Math.round(Math.random())];
    if (this._gameSettings) {
      this._tokenSelected = new Array(this._gameSettings.totalToken).fill(null);
    }
  }
}
