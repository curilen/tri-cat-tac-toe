import { useMemo, useRef } from 'react';
import type { Mesh, BufferGeometry, Material, Group } from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Center } from '@react-three/drei';

import { BOARD_OPTION_BUTTON_COLOR } from '@/constants/colors';
import {
  OPTION_BUTTON_POSITION,
  OPTION_BUTTON_HEIGHT,
} from '@/constants/positions';
import useAnimation from '@/hooks/useAnimation';

import GameText from '@/components/Game/GameText';

interface IOptionButtonProps {
  id?: string;
  text: string;
  textSize?: number;
  positionX?: number;
  withAnimation?: boolean;
  onClick?: (id?: string) => void | Promise<undefined>;
}

const animationTime = 150;
const animationRealTime = (animationTime || 1) / 10;
const halfAnimation = animationRealTime / 2;
const minZAxisAnimation = 0.1;

const OptionButton = ({
  id,
  text,
  textSize = 0.8,
  positionX = 0,
  withAnimation = true,
  onClick,
}: IOptionButtonProps) => {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
    null
  );
  const buttonGroupRef = useRef<Group | null>(null);
  const initialZAxisGroup = buttonGroupRef.current?.scale.z || 1;

  const zAxisAnimationPercentage = useMemo(
    () =>
      Number(
        ((initialZAxisGroup - minZAxisAnimation) / halfAnimation).toFixed(2)
      ),
    [initialZAxisGroup]
  );

  const cylinderAnimation = (delta: number) => {
    if (buttonGroupRef.current === null) {
      return;
    }
    const currentZ = buttonGroupRef.current.scale.z;
    const isDecrease = delta <= animationTime / 2;

    if (isDecrease && currentZ >= minZAxisAnimation) {
      buttonGroupRef.current.scale.setZ(currentZ - zAxisAnimationPercentage);
    } else if (!isDecrease && currentZ < initialZAxisGroup) {
      buttonGroupRef.current.scale.setZ(currentZ + zAxisAnimationPercentage);
    }
  };

  const onFinishAnimationCylinder = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const { startAnimation } = useAnimation({
    animation: cylinderAnimation,
    maxTime: animationTime,
    onFinish: onFinishAnimationCylinder,
  });

  const handleChangeCursor = (pointer = false) =>
    (document.body.style.cursor = pointer ? 'pointer' : 'auto');

  const handleOnClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (withAnimation) {
      startAnimation();
    } else if (onClick) {
      onClick(id);
    }
  };

  return (
    <group
      position={[positionX, -2.5, 1.3]}
      onPointerOver={() => handleChangeCursor(true)}
      onPointerOut={() => handleChangeCursor(false)}
      onClick={handleOnClick}
      ref={buttonGroupRef}
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
