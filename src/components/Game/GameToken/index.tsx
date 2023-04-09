import { memo, useCallback, useRef } from 'react';
import type { Mesh, BufferGeometry, Material } from 'three';
import { RoundedBox } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';

import {
  GAME_TOKEN_TEXTURES,
  GAME_TOKEN_TEXTURES_CONFIG,
} from '@/constants/textures';
import { GAME_TOKEN_VALUE_POSITION } from '@/constants/positions';
import { GAME_TOKEN_VALUE_COLOR } from '@/constants/colors';
import {
  GAME_TOKEN_MAX_ROTATION_DEGREES,
  GAME_TOKEN_ROTATION_SPEED,
} from '@/constants/rotation';

import useMyTextures from '@/hooks/useMyTextures';
import GameText from '@/components/Game/GameText';

interface IGameTokenProps extends IGameTokenElement {
  order: number;
  value?: keyof IGameTokens | null;
  onClick?: (event: ThreeEvent<MouseEvent>) => void | Promise<undefined>;
  canRotate?: boolean;
  rotationSpeed?: GAME_TOKEN_ROTATION_SPEED;
  onFinishAnimation?: (orderToken: number) => void | Promise<undefined>;
}

const GameToken = ({
  order,
  value,
  position,
  onClick,
  canRotate = true,
  rotationSpeed = GAME_TOKEN_ROTATION_SPEED.NORMAL,
  onFinishAnimation,
}: IGameTokenProps) => {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
    null
  );
  const { textures } = useMyTextures(GAME_TOKEN_TEXTURES);
  const isRotating = useRef(false);

  const handleChangeCursorPointer = (pointer = false) =>
    (document.body.style.cursor = pointer ? 'pointer' : 'auto');

  const handlePointerOver = () => handleChangeCursorPointer(true);
  const handlePointerOut = () => handleChangeCursorPointer(false);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!canRotate) {
      return;
    }
    isRotating.current = true;
    if (onClick) {
      onClick(event);
    }
  };

  const handleRotation = useCallback(() => {
    if (!canRotate || !meshRef.current) {
      return;
    }

    if (isRotating.current) {
      const radiantsDegrees = (Math.PI / 180) * GAME_TOKEN_MAX_ROTATION_DEGREES;
      meshRef.current.rotation.x += rotationSpeed;

      if (meshRef.current.rotation.x >= radiantsDegrees) {
        isRotating.current = false;
        meshRef.current.rotation.x = 0;
        if (onFinishAnimation) {
          onFinishAnimation(order);
        }
      }
    }
  }, [canRotate, meshRef, rotationSpeed, onFinishAnimation, order]);
  useFrame(handleRotation, 0);

  return (
    <group position={position || [0, 0, 2]}>
      <mesh
        position={[0, 0, 0]}
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <RoundedBox radius={0.2} args={[1.5, 1.5, 1.5]}>
          {value ? (
            <>
              <meshBasicMaterial
                attach="material"
                transparent={true}
                opacity={0.4}
              />
              <GameText
                value={value}
                size={1}
                height={0.5}
                position={GAME_TOKEN_VALUE_POSITION}
                color={GAME_TOKEN_VALUE_COLOR}
              />
            </>
          ) : (
            <meshStandardMaterial
              attach="material"
              {...textures}
              {...GAME_TOKEN_TEXTURES_CONFIG}
            />
          )}
        </RoundedBox>
      </mesh>
    </group>
  );
};

export default memo(GameToken);
