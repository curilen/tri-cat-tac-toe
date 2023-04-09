import { memo } from 'react';

import { SIDE_BOARDS_ROTATION } from '@/constants/positions';
import {
  GAME_BOARD_TEXTURES,
  GAME_BOARD_TEXTURES_CONFIG,
} from '@/constants/textures';
import useMyTextures from '@/hooks/useMyTextures';

interface IScoreBoardProps {
  players: IGamePlayers[];
}

const ScoreBoard = ({ players }: IScoreBoardProps) => {
  const { textures } = useMyTextures(GAME_BOARD_TEXTURES);
  console.log(players);

  return (
    <group position={[-10, 0, 2]} rotation={[0, SIDE_BOARDS_ROTATION, 0]}>
      <mesh>
        <boxGeometry attach="geometry" args={[5, 5, 0.5]} />
        <meshStandardMaterial
          attach="material"
          {...textures}
          {...GAME_BOARD_TEXTURES_CONFIG}
        />
      </mesh>
    </group>
  );
};

export default memo(ScoreBoard);
