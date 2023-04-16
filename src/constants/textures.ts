import { RepeatWrapping, Vector2 } from 'three';

const TEXTURE_PATH = '/assets/img/textures';
export const TEXTURE_DEFAULT_REPAT = new Vector2(1, 1);
export const TEXTURE_DEFAULT_WRAPPING = RepeatWrapping;

export const GAME_BOARD_TEXTURES: ITexturePath = {
  map: `${TEXTURE_PATH}/game-board/Board_Color.jpg`,
  normalMap: `${TEXTURE_PATH}/game-board/Board_Normal.jpg`,

  aoMap: `${TEXTURE_PATH}/game-board/Board_AO.jpg`,
  roughnessMap: `${TEXTURE_PATH}/game-board/Board_Roughness.jpg`,
};
export const GAME_BOARD_TEXTURES_CONFIG: ITextureConfig = {
  metalness: 0.1,
  aoMapIntensity: 1,
  roughness: 1,
};

export const GAME_TOKEN_TEXTURES: ITexturePath = {
  map: `${TEXTURE_PATH}/game-token/Token_Color.jpg`,
  metalnessMap: `${TEXTURE_PATH}/game-token/Token_Metalness.jpg`,

  roughnessMap: `${TEXTURE_PATH}/game-token/Token_Roughness.jpg`,
  aoMap: `${TEXTURE_PATH}/game-token/Token_AO.jpg`,
};
export const GAME_TOKEN_TEXTURES_CONFIG: ITextureConfig = {
  metalness: 0.5,
  roughness: 1,
  aoMapIntensity: 0.1,
};

export const GAME_SCOREBOARD_TEXTURES: ITexturePath = {
  map: `${TEXTURE_PATH}/game-board-info/BoardInfo_Color.jpg`,
  metalnessMap: `${TEXTURE_PATH}/game-board-info/BoardInfo_Metalness.jpg`,

  aoMap: `${TEXTURE_PATH}/game-board-info/BoardInfo_AO.jpg`,
  roughnessMap: `${TEXTURE_PATH}/game-board-info/BoardInfo_Roughness.jpg`,
};
export const GAME_SCOREBOARD_TEXTURES_CONFIG: ITextureConfig = {
  metalness: 1,
  aoMapIntensity: 1.5,
  roughness: 1,
};

export const GAME_BOARD_INFO_TEXTURES: ITexturePath = {
  map: `${TEXTURE_PATH}/game-board-info/BoardInfo_Color.jpg`,
  metalnessMap: `${TEXTURE_PATH}/game-board-info/BoardInfo_Metalness.jpg`,

  aoMap: `${TEXTURE_PATH}/game-board-info/BoardInfo_AO.jpg`,
  roughnessMap: `${TEXTURE_PATH}/game-board-info/BoardInfo_Roughness.jpg`,
};
export const GAME_BOARD_INFO_TEXTURES_CONFIG: ITextureConfig = {
  metalness: 1,
  aoMapIntensity: 1.5,
  roughness: 1,
};
