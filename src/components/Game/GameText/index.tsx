import { memo, useMemo } from 'react';
import type { Color, Vector3 } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import gameFontNormal from '@public/assets/fonts/Josefin_Sans_Regular.json';
import gameFontTitle from '@public/assets/fonts/Bombing_Regular.json';

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
}

const fontNormal = new FontLoader().parse(gameFontNormal);
const fontTitle = new FontLoader().parse(gameFontTitle);

const GameText = ({
  value,
  children,
  color = TEXT_DEFAULT_COLOR,
  position = DEFAULT_POSITION,
  size = 1,
  height = 0.2,
  isTitle = false,
}: IGameTextProps) => {
  const font = useMemo(() => (isTitle ? fontTitle : fontNormal), [isTitle]);
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
