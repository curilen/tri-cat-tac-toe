import type { Vector2, Wrapping } from 'three';
import { useTexture } from '@react-three/drei';

import {
  TEXTURE_DEFAULT_REPAT,
  TEXTURE_DEFAULT_WRAPPING,
} from '@/constants/textures';

interface IGetTexturesOptions {
  repeat?: Vector2;
  wrapS?: Wrapping;
  wrapT?: Wrapping;
}

const useMyTextures = (
  texturePath: ITexturePath,
  opts?: IGetTexturesOptions
) => {
  const textures: ITextureTypes = useTexture(texturePath);
  for (const key in textures) {
    const keyName = key as keyof ITextureTypes;
    const currentTexture = textures[keyName];
    if (currentTexture === undefined) {
      continue;
    }
    currentTexture.wrapS = opts?.wrapS || TEXTURE_DEFAULT_WRAPPING;
    currentTexture.wrapT = opts?.wrapT || TEXTURE_DEFAULT_WRAPPING;
    currentTexture.repeat = opts?.repeat || TEXTURE_DEFAULT_REPAT;
    textures[keyName] = currentTexture;
  }
  return {
    textures,
  };
};

export default useMyTextures;
