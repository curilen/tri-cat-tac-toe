import GameOptionsLogic from './gameOptions';
import GameSettingsLogic from './gameSettings';

export default class GameLogic {
  private _gameOptions?: GameOptionsLogic;
  private _currentTurn?: IGamePlayers;
  private _gameSettings?: GameSettingsLogic;
  private _tokenSelected: Array<keyof IGameTokens | null> = [];
  private _isFinishGame = false;

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

  public get isFinishGame() {
    return this._isFinishGame;
  }

  public clone(): GameLogic {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  public startGame() {
    if (!this.canPlay || !this.gameOptions?.players) {
      return false;
    }
    this._currentTurn = this.gameOptions?.players[Math.round(Math.random())];
    this._isFinishGame = false;
    if (this._gameSettings) {
      this._tokenSelected = new Array(this._gameSettings.totalToken).fill(null);
    }
  }

  public makeMove(numOrderToken: number) {
    if (
      this.tokenSelected[numOrderToken - 1] !== null ||
      this.currentTurn === undefined
    ) {
      return false;
    }

    const nextPlayer = this.gameOptions?.players?.find(
      (p) => p.token !== this.currentTurn?.token
    );
    if (!nextPlayer) {
      return false;
    }

    this._tokenSelected[numOrderToken - 1] = this.currentTurn.token || null;
    this.currentTurn = nextPlayer;

    if (this._tokenSelected.every((val) => val !== null)) {
      this._isFinishGame = true;
    }

    return true;
  }
}
