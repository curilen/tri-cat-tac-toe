import {
  GAME_OPTIONS_DIFFICULTY,
  GAME_OPTIONS_MODE,
  GAME_OPTIONS_STAGES,
  GAME_STAGE_DEFAULT,
} from '@/constants/game';

interface IGameOptions {
  mode?: GAME_OPTIONS_MODE;
  difficulty?: GAME_OPTIONS_DIFFICULTY;
  readonly stage: GAME_OPTIONS_STAGES;
  isComplete: boolean;
}

export default class GameOptions implements IGameOptions {
  private _mode?: GAME_OPTIONS_MODE;
  private _difficulty?: GAME_OPTIONS_DIFFICULTY;
  private _stage: GAME_OPTIONS_STAGES;

  constructor() {
    this._stage = GAME_STAGE_DEFAULT; // First Stage
  }

  public get mode() {
    return this._mode;
  }
  public set mode(newMode: GAME_OPTIONS_MODE | undefined) {
    this._mode = newMode;
    this._stage = GAME_OPTIONS_STAGES.Difficulty; // Second Stage
  }

  public get difficulty() {
    return this._difficulty;
  }
  public set difficulty(newDifficulty: GAME_OPTIONS_DIFFICULTY | undefined) {
    this._difficulty = newDifficulty;
  }

  public get stage() {
    return this._stage;
  }

  public get isComplete() {
    return this._mode !== undefined && this.difficulty !== undefined;
  }
}
