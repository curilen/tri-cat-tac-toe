import { memo, useCallback, useMemo } from 'react';

import {
  BOARD_SIZE_DEFAULT,
  SIDE_BOARDS_ROTATION,
} from '@/constants/positions';
import {
  GAME_BOARD_INFO_TEXTURES,
  GAME_BOARD_INFO_TEXTURES_CONFIG,
} from '@/constants/textures';
import useMyTextures from '@/hooks/useMyTextures';

import CurrentTurn from './CurrentTurn';
import GameOver from './GameOver';

interface ICurrentGameInfoProps {
  currentTurn: IGamePlayers;
  winner?: IGamePlayers | null;
  isFinished?: boolean;
  onClickRematch?: () => void;
  boardSize?: number;
}

const CurrentGameInfo = ({
  currentTurn,
  isFinished = false,
  winner = null,
  onClickRematch,
  boardSize = BOARD_SIZE_DEFAULT,
}: ICurrentGameInfoProps) => {
  const { textures } = useMyTextures(GAME_BOARD_INFO_TEXTURES);
  const distanceBoard = useMemo(() => Math.round(boardSize / 1.4), [boardSize]);

  const handleRematch = useCallback(() => {
    if (onClickRematch) {
      onClickRematch();
    }
  }, [onClickRematch]);

  return (
    <group
      position={[distanceBoard, 0, 2]}
      rotation={[0, -SIDE_BOARDS_ROTATION, 0]}
    >
      <mesh>
        <boxGeometry attach="geometry" args={[5, 5, 0.5]} />
        <meshStandardMaterial
          attach="material"
          {...textures}
          {...GAME_BOARD_INFO_TEXTURES_CONFIG}
        />
      </mesh>
      {!isFinished ? (
        <CurrentTurn currentTurn={currentTurn} />
      ) : (
        <GameOver winner={winner} onClickRematch={handleRematch} />
      )}
    </group>
  );
};

export default memo(CurrentGameInfo);
