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
    this._players = [...(this.players || [player])];
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
    const newMode = newValueString as keyof typeof GAME_OPTIONS_MODE;
    this.mode = GAME_OPTIONS_MODE[newMode];

    const defaultPlayers = GAME_PLAYERS_DEFAULT; // TODO: if you want something other than 1 and 2

    if (newMode === GAME_OPTIONS_MODE.OneVSCPU) {
      this.newPlayer(defaultPlayers[0]);
      this._stage = GAME_OPTIONS_STAGES.Difficulty; // Second Stage
    } else if (newMode === GAME_OPTIONS_MODE.OneVSOne) {
      this.newPlayer(defaultPlayers[0]);
      this.newPlayer(defaultPlayers[1]);
      this._stage = GAME_OPTIONS_STAGES.ChooseToken; // Third Stage
    }
    return true;
  }

  private strategyDifficulty(newValueString: string) {
    const enumValues: string[] = Object.values(GAME_OPTIONS_DIFFICULTY);
    if (!enumValues.includes(newValueString)) {
      return false;
    }
    const newDifficulty =
      newValueString as keyof typeof GAME_OPTIONS_DIFFICULTY;
    this.difficulty = GAME_OPTIONS_DIFFICULTY[newDifficulty];
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

    const idxPlayer = this.players?.findIndex((el) => el.id === refId) ?? -1;
    if (idxPlayer < 0) {
      return false;
    }

    this._players[idxPlayer].token = newValueString as keyof IGameTokens;
    // Check if you want to implement more than 2 players
    //this._players[1].token = newValueString as keyof IGameTokens;
    this.isComplete = true;

    return true;
  }
}
