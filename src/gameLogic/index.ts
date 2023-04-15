import GameOptionsLogic from './gameOptions';
import GameSettingsLogic from './gameSettings';

export default class GameLogic {
  private _gameOptions?: GameOptionsLogic;
  private _currentTurn?: IGamePlayers;
  private _gameSettings?: GameSettingsLogic;
  private _tokenSelected: Array<keyof IGameTokens | null> = [];
  private _isFinishGame = false;
  private _firstPlayerPlay: IGamePlayers | null = null;
  private _winningPositions: number[] = [];
  private _winner: IGamePlayers | null = null;

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

  public get winningPositions() {
    return this._winningPositions;
  }

  public get winner() {
    return this._winner;
  }

  public clone(): GameLogic {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  public startGame() {
    if (!this.canPlay || !this.gameOptions?.players) {
      return false;
    }
    this._gameSettings?.createVictoryPatterns();
    this._currentTurn = this.gameOptions?.players[Math.round(Math.random())];
    this._firstPlayerPlay = this._currentTurn;
    this._isFinishGame = false;
    this._winningPositions = [];
    this._winner = null;
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

    const movementsMade =
      this._tokenSelected.filter((e) => e === this._firstPlayerPlay?.token)
        .length || 0;
    if (this.gameSettings?.winnerBeVerified(movementsMade)) {
      if (this.checkIsWinner()) {
        return true;
      } else if (this._tokenSelected.every((t) => t !== null)) {
        this._isFinishGame = true;
        return true;
      }
    }

    this.currentTurn = nextPlayer;
    return true;
  }

  private checkIsWinner() {
    let isWinner = false;
    if (!this.gameSettings || !this.currentTurn) {
      return isWinner;
    }

    const playerPositions: number[] = [];
    for (let t = 0; t < this.tokenSelected.length; t++) {
      if (this.tokenSelected[t] === this.currentTurn?.token) {
        playerPositions.push(t);
      }
    }
    playerPositions.sort();
    isWinner = this.validateWinner(new Set(playerPositions));
    if (isWinner) {
      this._isFinishGame = true;
      this._winner = this._currentTurn || null;
      if (this.gameOptions) {
        this.gameOptions.newWinner(this._winner?.id || '');
      }
    }
    return isWinner;
  }

  private validateWinner(playerPositions: Set<number>) {
    if (!this.gameSettings) {
      return false;
    }

    // Matriz O(mn)
    for (const subarray of this.gameSettings.victoryPatterns) {
      let foundAllElements = true;
      for (const element of subarray) {
        // has O(1)
        if (!playerPositions.has(element)) {
          foundAllElements = false;
          break;
        }
      }
      if (foundAllElements) {
        this._winningPositions = subarray;
        return true;
      }
    }

    return false;
  }
}
