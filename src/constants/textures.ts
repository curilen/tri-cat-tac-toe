import { RepeatWrapping, Vector2 } from 'three';

const TEXTURE_PATH = '/assets/img/textures';
export const TEXTURE_DEFAULT_REPAT = new Vector2(1, 1);
export const TEXTURE_DEFAULT_WRAPPING = RepeatWrapping;

export const BOARD_TEXTURES: ITexturePath = {
  map: `${TEXTURE_PATH}/board/Board_Color.jpg`,
  roughnessMap: `${TEXTURE_PATH}/board/Board_Roughness.jpg`,
};

export const BOARD_TEXTURES_CONFIG: ITextureConfig = {
  roughness: 2,
};
