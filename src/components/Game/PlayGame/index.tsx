import { memo, useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import GameLogic from '@/gameLogic';
import GameToken from '@/components/Game/GameToken';
const CurrentTurn = dynamic(import('@/components/Game/CurrentTurn'));

interface IPlayGameProps {
  game: GameLogic;
  onFinishGame?: (game: GameLogic) => void;
}

const PlayGame = ({ game, onFinishGame }: IPlayGameProps) => {
  const [tokenSelected, setTokenSelected] = useState(game.tokenSelected);

  const tokenList = useMemo(
    () => game.gameSettings?.getTokenList() || [],
    [game.gameSettings]
  );

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
      </group>
      {game.currentTurn ? (
        <CurrentTurn
          currentTurn={game.currentTurn}
          winner={game.winner}
          isFinished={game.isFinishGame}
        />
      ) : null}
    </>
  );
};

export default memo(PlayGame);
