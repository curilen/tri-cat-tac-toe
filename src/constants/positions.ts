import { Vector3 } from 'three';

export const DEFAULT_POSITION = new Vector3(0, 0, 0);
export const CAMERA_DEFAULT_POSITION = new Vector3(0, 1, 20);
export const LIGHTS_BOARD_DEFAULT_POSITION = [
  new Vector3(0, 8, 5),
  new Vector3(0, 8, -5),
];
export const BOARD_DISTANCE_MIN = 6;
export const BOARD_TEXT_ZAXIS_MIN = 0.8;

export const OPTION_BUTTON_HEIGHT = 1.5;
export const OPTION_BUTTON_POSITION = new Vector3(
  0,
  0,
  OPTION_BUTTON_HEIGHT / 2
);
export const OPTION_BACK_BUTTON_TEXT_POSITION = new Vector3(0, 0, 0.5);

export const SIDE_BOARDS_ROTATION = 0.8;

export const CURRENT_TURN_VALUE_POSITION = new Vector3(0, -1.5, 0);

export const SCORE_BOARD_VALUE_POSITION = new Vector3(3, -0.2, 0);
