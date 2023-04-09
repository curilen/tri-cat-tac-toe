import { memo, useRef } from 'react';
import type { Mesh, BufferGeometry, Material } from 'three';
import { RoundedBox } from '@react-three/drei';

import {
  GAME_TOKEN_TEXTURES,
  GAME_TOKEN_TEXTURES_CONFIG,
} from '@/constants/textures';
import { GAME_TOKEN_VALUE_POSITION } from '@/constants/positions';
import { GAME_TOKEN_VALUE_COLOR } from '@/constants/colors';

import useMyTextures from '@/hooks/useMyTextures';
import GameText from '@/components/Game/GameText';

interface IGameTokenProps {
  value?: keyof IGameTokens | null;
}

const GameToken = ({ value }: IGameTokenProps) => {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
    null
  );
  const { textures } = useMyTextures(GAME_TOKEN_TEXTURES);

  return (
    <group position={[0, 0, 2]}>
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <RoundedBox radius={0.2} args={[2, 2, 2]}>
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
