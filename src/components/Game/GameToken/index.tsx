import { memo, useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import type { Mesh } from 'three';
import { RoundedBox } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';

import {
  GAME_TOKEN_TEXTURES,
  GAME_TOKEN_TEXTURES_CONFIG,
} from '@/constants/textures';
import {
  GAME_TOKEN_BOX_SIZE,
  GAME_TOKEN_VALUE_POSITION,
} from '@/constants/positions';
import { GAME_TOKEN_VALUE_COLOR } from '@/constants/colors';
import {
  GAME_TOKEN_MAX_ROTATION_DEGREES,
  GAME_TOKEN_ROTATION_TIME_MILLS,
} from '@/constants/rotation';

import useMyTextures from '@/hooks/useMyTextures';
import useAnimation from '@/hooks/useAnimation';

import GameText from '@/components/Game/GameText';

interface IGameTokenProps extends IGameTokenElement {
  value?: keyof IGameTokens | null;
  canSelected?: boolean;
  onFinish?: (orderToken: number) => void | Promise<undefined>;
  withAnimation?: boolean;
}

const initalXRotation = 0;
const radiantsDegrees = (Math.PI / 180) * GAME_TOKEN_MAX_ROTATION_DEGREES;
const radMills =
  (radiantsDegrees - initalXRotation) / GAME_TOKEN_ROTATION_TIME_MILLS;

const GameToken = forwardRef(
  (props: IGameTokenProps, ref: Ref<IGameTokenRef>) => {
    const {
      order,
      value,
      position,
      onFinish,
      withAnimation = true,
      canSelected = true,
    } = props;
    const meshRef = useRef<Mesh | null>(null);
    const { textures } = useMyTextures(GAME_TOKEN_TEXTURES);
    const isRotating = useRef(false);

    const handleChangeCursorPointer = (pointer = false) =>
      (document.body.style.cursor = pointer ? 'pointer' : 'auto');

    const handlePointerOver = () => handleChangeCursorPointer(true);
    const handlePointerOut = () => handleChangeCursorPointer(false);

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (!canSelected) {
        return;
      }
      if (withAnimation) {
        isRotating.current = true;
        startAnimation();
      } else if (onFinish) {
        onFinish(order);
      }
    };

    const handleFinishAnimation = () => (onFinish ? onFinish(order) : null);

    const handleRotation = (elapsedTime: number) => {
      if (!canSelected || !meshRef.current || !isRotating.current) {
        return false;
      }

      const diffRotation = radMills * elapsedTime;
      const newRotation = initalXRotation + diffRotation;

      meshRef.current.rotation.x = newRotation;
      return true;
    };

    const { startAnimation } = useAnimation({
      animationFunction: handleRotation,
      maxTime: GAME_TOKEN_ROTATION_TIME_MILLS,
      onFinish: handleFinishAnimation,
    });

    useImperativeHandle(ref, () => ({
      callOnClick: () => {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
        }) as unknown as ThreeEvent<MouseEvent>;
        handleClick(clickEvent);
      },
    }));

    return (
      <group position={position || [0, 0, 2]}>
        <mesh
          position={[0, 0, 0]}
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <RoundedBox
            radius={0.2}
            args={[
              GAME_TOKEN_BOX_SIZE,
              GAME_TOKEN_BOX_SIZE,
              GAME_TOKEN_BOX_SIZE,
            ]}
          >
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
  }
);

GameToken.displayName = 'GameToken';
export default memo(GameToken);
