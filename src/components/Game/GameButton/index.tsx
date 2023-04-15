import { memo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Center } from '@react-three/drei';

import { GAME_BUTTON_COLOR, GAME_BUTTON_TEXT_COLOR } from '@/constants/colors';
import { GAME_BUTTON_TEXT_POSITION } from '@/constants/positions';

import GameText from '@/components/Game/GameText';

interface IGameButtonProps {
  text?: string;
  children?: string;
  onClick?: () => void;
}
const GameButton = ({ text, children, onClick }: IGameButtonProps) => {
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
      position={[0, -6, 1.5]}
      onClick={handleClick}
      onPointerOver={() => handleChangeCursor(true)}
      onPointerOut={() => handleChangeCursor(false)}
    >
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry attach="geometry" args={[1, 1, 3]} />
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
          position={GAME_BUTTON_TEXT_POSITION}
        />
      </Center>
    </group>
  );
};

export default memo(GameButton);
