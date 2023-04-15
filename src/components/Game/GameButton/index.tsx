import { memo, useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Center } from '@react-three/drei';

import { GAME_BUTTON_COLOR, GAME_BUTTON_TEXT_COLOR } from '@/constants/colors';
import { DEFAULT_POSITION } from '@/constants/positions';

import GameText from '@/components/Game/GameText';

interface IGameButtonProps {
  text?: string;
  children?: string;
  onClick?: () => void;
  position?: Vector3;
  width?: number;
  depth?: number;
}
const GameButton = ({
  text,
  children,
  onClick,
  position = DEFAULT_POSITION,
  width = 3,
  depth = 1,
}: IGameButtonProps) => {
  const defaultTextPosition = useMemo(
    () => new Vector3(0, 0, Math.round((depth / 2) * 10) / 10),
    [depth]
  );

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const handleChangeCursor = (pointer = false) =>
    (document.body.style.cursor = pointer ? 'pointer' : 'auto');

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => handleChangeCursor(true)}
      onPointerOut={() => handleChangeCursor(false)}
    >
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry attach="geometry" args={[depth, 1, width]} />
        <meshStandardMaterial
          attach="material"
          metalness={0.3}
          color={GAME_BUTTON_COLOR}
        />
      </mesh>
      <Center disableZ>
        <GameText
          value={text || children || ''}
          size={0.5}
          height={0.1}
          color={GAME_BUTTON_TEXT_COLOR}
          position={defaultTextPosition}
        />
      </Center>
    </group>
  );
};

export default memo(GameButton);
