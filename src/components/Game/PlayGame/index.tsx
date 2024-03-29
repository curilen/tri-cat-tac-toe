import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import GameLogic from '@/gameLogic';
import GameToken from '@/components/Game/GameToken';
const CurrentGameInfo = dynamic(import('@/components/Game/CurrentGameInfo'));
const VictoryLine = dynamic(import('@/components/Game/VictoryLine'));

interface IPlayGameProps {
  game: GameLogic;
  onFinishGame?: (game: GameLogic) => void;
  onClickRematch?: () => void;
}

const PlayGame = ({ game, onFinishGame, onClickRematch }: IPlayGameProps) => {
  const [tokenSelected, setTokenSelected] = useState(game.tokenSelected);
  const tokenList = useMemo(
    () => game.gameSettings?.getTokenList() || [],
    [game.gameSettings]
  );
  const tokensRef = useRef<Array<IGameTokenRef | null>>(
    new Array(tokenList.length).fill(null)
  );

  const simulateHandleSelectToken = useCallback((position: number) => {
    if (position < 0 || position > tokensRef.current.length - 1) {
      return;
    }
    if (tokensRef.current[position] === null) {
      return;
    }
    tokensRef.current[position]?.callOnClick();
  }, []);

  useEffect(() => {
    if (JSON.stringify(tokenSelected) !== JSON.stringify(game.tokenSelected)) {
      // New game
      setTokenSelected([...game.tokenSelected]);
    } else if (game.isCPUTurn() && !game.isFinishGame) {
      simulateHandleSelectToken(game.getCPUMovement());
    }
  }, [game, tokenSelected, simulateHandleSelectToken]);

  const handleSelectToken = useCallback(
    (numOrderToken: number) => {
      game.makeMove(numOrderToken);
      setTokenSelected([...game.tokenSelected]);
      if (onFinishGame && game.isFinishGame) {
        onFinishGame(game);
      }
    },
    [game, onFinishGame]
  );

  const handleRematch = useCallback(() => {
    if (onClickRematch) {
      onClickRematch();
    }
  }, [onClickRematch]);

  const TokensComponent = useCallback(() => {
    return (
      <>
        {tokenList.map((token, idx) => {
          const value = tokenSelected[token.order - 1];
          return (
            <GameToken
              key={`token-${idx}`}
              {...token}
              value={value}
              onFinish={handleSelectToken}
              canSelected={value === null && !game.isFinishGame}
              ref={(el) => (tokensRef.current[idx] = el)}
            />
          );
        })}
      </>
    );
  }, [tokenList, tokenSelected, handleSelectToken, game.isFinishGame]);

  return (
    <>
      <group>
        <TokensComponent />
        {game.isFinishGame && game.winningPositions ? (
          <VictoryLine game={game} />
        ) : null}
      </group>
      {game.currentTurn ? (
        <CurrentGameInfo
          currentTurn={game.currentTurn}
          winner={game.winner}
          isFinished={game.isFinishGame}
          onClickRematch={handleRematch}
          boardSize={game.gameSettings?.boardSize}
        />
      ) : null}
    </>
  );
};

export default memo(PlayGame);
