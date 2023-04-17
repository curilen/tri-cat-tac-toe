import { memo, useMemo } from 'react';
import { Euler, Vector3 } from 'three';

import GameLogic from '@/gameLogic';
import { GAME_WINNING_TYPE_LINES } from '@/constants/game';
import { BOARD_PADDING, GAME_TOKEN_BOX_SIZE } from '@/constants/positions';
import { GAME_VICTORY_LINE_COLOR } from '@/constants/colors';

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
    if (!game.gameSettings) {
      return new Vector3(0, 0, 0);
    }
    let boardSpace = game.gameSettings.boardSize / 2;
    boardSpace -= GAME_TOKEN_BOX_SIZE;
    boardSpace -= BOARD_PADDING / 2;

    const rowNumber = game.winningPositions[0] / game.gameSettings.totalColumns;

    const newPosRow =
      boardSpace - rowNumber * game.gameSettings.incrementDistnceToken;
    const newPosCol =
      -boardSpace +
      game.winningPositions[0] * game.gameSettings.incrementDistnceToken;

    switch (winningTypeBoard) {
      case GAME_WINNING_TYPE_LINES.ROWS:
        return new Vector3(0, newPosRow, 0);
      case GAME_WINNING_TYPE_LINES.COLUMN:
        return new Vector3(newPosCol, 0, 0);
      default:
        return new Vector3(0, 0, 0);
    }
  }, [winningTypeBoard, game.winningPositions, game.gameSettings]);

  const widthLine = useMemo(
    () => (game.gameSettings?.boardSize || 0) - BOARD_PADDING,
    [game.gameSettings?.boardSize]
  );

  return (
    <group position={[0, 0, 3]}>
      <mesh position={position} rotation={rotation}>
        <boxGeometry attach="geometry" args={[0.4, 0.4, widthLine]} />
        <meshStandardMaterial
          attach="material"
          metalness={0.3}
          color={GAME_VICTORY_LINE_COLOR}
        />
      </mesh>
    </group>
  );
};

export default memo(VictoryLine);
