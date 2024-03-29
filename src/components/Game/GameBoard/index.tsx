import { ReactNode } from 'react';
import { LIGHT_COLOR } from '@/constants/colors';
import {
  BOARD_SIZE_DEFAULT,
  DEFAULT_POSITION,
  LIGHTS_BOARD_DEFAULT_POSITION,
} from '@/constants/positions';
import {
  GAME_BOARD_TEXTURES,
  GAME_BOARD_TEXTURES_CONFIG,
} from '@/constants/textures';
import useMyTextures from '@/hooks/useMyTextures';

interface IGameBoardProps {
  children?: ReactNode;
  size?: number;
}

const GameBoard = ({
  children,
  size = BOARD_SIZE_DEFAULT,
}: IGameBoardProps) => {
  const { textures } = useMyTextures(GAME_BOARD_TEXTURES);
  return (
    <group>
      {LIGHTS_BOARD_DEFAULT_POSITION.map((position, idx) => (
        <pointLight
          position={position}
          intensity={1}
          key={`light-${idx}`}
          distance={30}
          decay={1}
          color={LIGHT_COLOR}
        />
      ))}

      <mesh position={DEFAULT_POSITION}>
        <boxGeometry attach="geometry" args={[size, size, 1]} />
        <meshStandardMaterial
          attach="material"
          {...textures}
          {...GAME_BOARD_TEXTURES_CONFIG}
        />
      </mesh>
      {children ? children : null}
    </group>
  );
};

export default GameBoard;
