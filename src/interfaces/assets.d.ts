type ITexturePath = {
  [x in keyof ITextureTypes]: string;
};

interface ITextureTypes {
  map?: import('three').Texture;
  aoMap?: import('three').Texture;
  roughnessMap?: import('three').Texture;
  metalnessMap?: import('three').Texture;
  normalMap?: import('three').Texture;
  displacementMap?: import('three').Texture;
}

interface ITextureConfig {
  roughness?: number;
  metalness?: number;

  displacementScale?: number;
  displacementBias?: number;

  normalScale?: import('three').Vector2;

  aoMapIntensity?: number;
}
