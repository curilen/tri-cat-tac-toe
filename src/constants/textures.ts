import { RepeatWrapping, Vector2 } from 'three';

const TEXTURE_PATH = '/assets/img/textures';
export const TEXTURE_DEFAULT_REPAT = new Vector2(1, 1);
export const TEXTURE_DEFAULT_WRAPPING = RepeatWrapping;

export const GAME_BOARD_TEXTURES: ITexturePath = {
  map: `${TEXTURE_PATH}/game-board/Board_Color.jpg`,
  roughnessMap: `${TEXTURE_PATH}/game-board/Board_Roughness.jpg`,
};

export const GAME_BOARD_TEXTURES_CONFIG: ITextureConfig = {
  roughness: 2,
};
