import { memo, useMemo } from 'react';
import { Euler, Vector3 } from 'three';

import GameLogic from '@/gameLogic';
import { GAME_WINNING_TYPE_LINES } from '@/constants/game';

interface IVictoryLineProps {
  game: GameLogic;
}

const commonRotation = Math.PI / 2;

const VictoryLine = ({ game }: IVictoryLineProps) => {
  const winningTypeBoard = useMemo(
    () => game.gameSettings?.getWinningTypeBoard(game.winningPositions),
    [game.gameSettings, game.winningPositions]
  );

  const rotation = useMemo(() => {
    const rotationDiagonal =
      game.winningPositions[0] === 0 ? Math.PI / 4 : -Math.PI / 4;

    switch (winningTypeBoard) {
      case GAME_WINNING_TYPE_LINES.ROWS:
        return new Euler(0, commonRotation, 0);
      case GAME_WINNING_TYPE_LINES.COLUMN:
        return new Euler(commonRotation, 0, 0);
      default:
        return new Euler(commonRotation, rotationDiagonal, 0);
    }
  }, [winningTypeBoard, game.winningPositions]);

  const position = useMemo(() => {
    const totalCols = game.gameSettings?.totalColumns || 3;
    const newPosRow = totalCols + -game.winningPositions[0];
    const newPosCol = -totalCols + game.winningPositions[0] * totalCols;

    switch (winningTypeBoard) {
      case GAME_WINNING_TYPE_LINES.ROWS:
        return new Vector3(0, newPosRow, 0);
      case GAME_WINNING_TYPE_LINES.COLUMN:
        return new Vector3(newPosCol, 0, 0);
      default:
        return new Vector3(0, 0, 0);
    }
  }, [
    winningTypeBoard,
    game.gameSettings?.totalColumns,
    game.winningPositions,
  ]);

  if (!game.gameSettings || winningTypeBoard === null) {
    return <></>;
  }

  return (
    <group position={[0, 0, 3]}>
      <mesh position={position} rotation={rotation}>
        <boxGeometry
          attach="geometry"
          args={[0.4, 0.4, game.gameSettings.totalToken]}
        />
        <meshStandardMaterial attach="material" metalness={0.3} />
      </mesh>
    </group>
  );
};

export default memo(VictoryLine);
