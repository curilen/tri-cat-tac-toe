import {
  GAME_OPTIONS_DIFFICULTY,
  GAME_OPTIONS_MODE,
  GAME_OPTIONS_STAGES,
  GAME_STAGE_DEFAULT,
  GAME_TOKENS,
  GAME_PLAYERS_DEFAULT,
} from '@/constants/game';

interface IGameOptionsLogic {
  mode?: GAME_OPTIONS_MODE;
  difficulty?: GAME_OPTIONS_DIFFICULTY;
  readonly stage: GAME_OPTIONS_STAGES;
  isComplete: boolean;
}

export default class GameOptionsLogic implements IGameOptionsLogic {
  private _mode?: GAME_OPTIONS_MODE;
  private _difficulty?: GAME_OPTIONS_DIFFICULTY;
  private _stage: GAME_OPTIONS_STAGES;
  private _players?: IGamePlayers[];
  private _isComplete = false;

  constructor() {
    this._stage = GAME_STAGE_DEFAULT; // First Stage
  }

  public get mode() {
    return this._mode;
  }
  private set mode(newMode: GAME_OPTIONS_MODE | undefined) {
    this._mode = newMode;
  }

  public get difficulty() {
    return this._difficulty;
  }
  private set difficulty(newDifficulty: GAME_OPTIONS_DIFFICULTY | undefined) {
    this._difficulty = newDifficulty;
  }

  public get players() {
    return this._players;
  }

  private newPlayer(player: IGamePlayers) {
    this._players = [...(this.players || []), player];
  }

  private resetPlayers() {
    this._players = [];
  }

  public get stage() {
    return this._stage;
  }

  public get isComplete() {
    return this._isComplete;
  }

  public set isComplete(complete: boolean) {
    this._isComplete = complete;
  }

  public previousStage() {
    switch (this.stage) {
      case GAME_OPTIONS_STAGES.Difficulty:
        this._stage = GAME_OPTIONS_STAGES.Mode;
        break;

      case GAME_OPTIONS_STAGES.ChooseToken:
        if (this.mode === GAME_OPTIONS_MODE.OneVSOne) {
          this._stage = GAME_OPTIONS_STAGES.Mode;
        } else if (this.mode === GAME_OPTIONS_MODE.OneVSCPU) {
          this._stage = GAME_OPTIONS_STAGES.Difficulty;
        }
        break;

      default:
        return;
    }
  }

  public finishStage(newValue: string, refId?: string) {
    switch (this._stage) {
      case GAME_OPTIONS_STAGES.Mode:
        return this.strategyMode(newValue);
      case GAME_OPTIONS_STAGES.Difficulty:
        return this.strategyDifficulty(newValue);
      case GAME_OPTIONS_STAGES.ChooseToken:
        return this.strategyChooseToken(newValue, refId);
      default:
        return;
    }
  }

  private strategyMode(newValueString: string) {
    const enumValues: string[] = Object.values(GAME_OPTIONS_MODE);
    if (!enumValues.includes(newValueString)) {
      return false;
    }
    this.resetPlayers();

    const newMode = newValueString as GAME_OPTIONS_MODE;
    this.mode = newMode;

    // Check if you want something other than 1 and 2
    const defaultPlayers = GAME_PLAYERS_DEFAULT;
    this.newPlayer(defaultPlayers[0]);
    this.newPlayer(defaultPlayers[1]);

    if (newMode === GAME_OPTIONS_MODE.OneVSCPU) {
      this._stage = GAME_OPTIONS_STAGES.Difficulty; // Second Stage
    } else if (newMode === GAME_OPTIONS_MODE.OneVSOne) {
      this._stage = GAME_OPTIONS_STAGES.ChooseToken; // Third Stage
    } else {
      return false;
    }
    return true;
  }

  private strategyDifficulty(newValueString: string) {
    const enumValues: string[] = Object.values(GAME_OPTIONS_DIFFICULTY);
    if (!enumValues.includes(newValueString)) {
      return false;
    }

    const newDifficulty = newValueString as GAME_OPTIONS_DIFFICULTY;
    this.difficulty = newDifficulty;

    this._stage = GAME_OPTIONS_STAGES.ChooseToken; // Third Stage
  }

  private strategyChooseToken(newValueString: string, refId?: string) {
    if (
      refId === undefined ||
      this._players === undefined ||
      !(newValueString in GAME_TOKENS)
    ) {
      return false;
    }

    this._players[0].token = newValueString as keyof IGameTokens;
    this._players[1].token = Object.keys(GAME_TOKENS).find(
      (key) => key !== newValueString
    ) as keyof IGameTokens;

    this.isComplete = true;

    return true;
  }
}
