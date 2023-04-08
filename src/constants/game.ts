export enum GAME_OPTIONS_STAGES {
  Mode = 'mode',
  Difficulty = 'difficulty',
}

export const GAME_STAGE_DEFAULT = GAME_OPTIONS_STAGES.Mode;

export enum GAME_OPTIONS_MODE {
  OneVSOne = 'OneVSOne',
  OneVSCPU = 'OneVSCPU',
}

export enum GAME_OPTIONS_DIFFICULTY {
  Easy,
  Medium,
  Hard,
}
