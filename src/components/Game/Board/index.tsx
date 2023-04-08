import { LIGHT_COLOR } from '@/constants/colors';
import {
  DEFAULT_POSITION,
  LIGHTS_BOARD_DEFAULT_POSITION,
} from '@/constants/positions';
import { BOARD_TEXTURES, BOARD_TEXTURES_CONFIG } from '@/constants/textures';
import useMyTextures from '@/hooks/useMyTextures';

const Board = () => {
  const { textures } = useMyTextures(BOARD_TEXTURES);

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
        <boxGeometry attach="geometry" args={[10, 10, 1]} />
        <meshStandardMaterial
          attach="material"
          {...textures}
          {...BOARD_TEXTURES_CONFIG}
        />
      </mesh>
    </group>
  );
};

export default Board;
