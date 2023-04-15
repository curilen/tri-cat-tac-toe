import { memo, useMemo } from 'react';
import type { Color, Vector3 } from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import gameFontNormal from '@public/assets/fonts/Normal_Regular.json';
import gameFontTitle from '@public/assets/fonts/Title_Regular.json';

import { TEXT_DEFAULT_COLOR } from '@/constants/colors';
import { DEFAULT_POSITION } from '@/constants/positions';

interface IGameTextProps {
  value?: string;
  children?: string;
  color?: Color;
  position?: Vector3;
  size?: number;
  height?: number;
  isTitle?: boolean;
  customFont?: Font;
}

const fontNormal = new FontLoader().parse(gameFontNormal);
const fontTitle = new FontLoader().parse(gameFontTitle);

const GameText = ({
  value,
  children,
  color = TEXT_DEFAULT_COLOR,
  position = DEFAULT_POSITION,
  size = 0.8,
  height = 0.2,
  isTitle = false,
  customFont,
}: IGameTextProps) => {
  const font = useMemo(
    () => (customFont ? customFont : isTitle ? fontTitle : fontNormal),
    [isTitle, customFont]
  );
  const text = useMemo(() => value || children || '', [value, children]);

  return (
    <>
      <mesh position={position}>
        <textGeometry args={[text, { font, size, height }]} />
        <meshPhysicalMaterial attach="material" color={color} side={2} />
      </mesh>
    </>
  );
};

export default memo(GameText);
