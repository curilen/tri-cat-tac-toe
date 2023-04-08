import { useRef } from 'react';
import type { Mesh, BufferGeometry, Material } from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import { Center } from '@react-three/drei';

import { BOARD_OPTION_BUTTON_COLOR } from '@/constants/colors';
import {
  OPTION_BUTTON_POSITION,
  OPTION_BUTTON_HEIGHT,
} from '@/constants/positions';

import GameText from '@/components/Game/GameText';

interface IOptionButtonProps {
  text: string;
  textSize?: number;
  positionX?: number;
  onClick?: (event: ThreeEvent<MouseEvent>) => void | Promise<undefined>;
}

const OptionButton = ({
  text,
  textSize = 0.8,
  positionX = 0,
  onClick,
}: IOptionButtonProps) => {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
    null
  );
  const handleChangeCursor = (pointer = false) =>
    (document.body.style.cursor = pointer ? 'pointer' : 'auto');

  const handleOnClick = (event: ThreeEvent<MouseEvent>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <group
      position={[positionX, -2.5, 1.3]}
      onPointerOver={() => handleChangeCursor(true)}
      onPointerOut={() => handleChangeCursor(false)}
      onClick={handleOnClick}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={meshRef}>
        <cylinderGeometry
          attach="geometry"
          args={[1.3, 1.3, OPTION_BUTTON_HEIGHT]}
        />
        <meshStandardMaterial
          attach="material"
          metalness={0.3}
          color={BOARD_OPTION_BUTTON_COLOR}
        />
      </mesh>
      <Center disableZ>
        <GameText
          value={text}
          size={textSize}
          height={0.1}
          position={OPTION_BUTTON_POSITION}
        />
      </Center>
    </group>
  );
};

export default OptionButton;
