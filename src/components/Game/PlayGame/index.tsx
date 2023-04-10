import { memo, useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import GameLogic from '@/gameLogic';
import GameToken from '@/components/Game/GameToken';
const CurrentTurn = dynamic(import('@/components/Game/CurrentTurn'));

interface IPlayGameProps {
  game: GameLogic;
}

const PlayGame = ({ game }: IPlayGameProps) => {
  const [tokenSelected, setTokenSelected] = useState(game.tokenSelected);

  const tokenList = useMemo(
    () => game.gameSettings?.getTokenList() || [],
    [game.gameSettings]
  );

  const handleSelectToken = useCallback(
    (numOrderToken: number) => {
      game.makeMove(numOrderToken);
      setTokenSelected([...game.tokenSelected]);
    },
    [game]
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
              canSelected={value === null}
            />
          );
        })}
      </>
    );
  }, [tokenList, tokenSelected, handleSelectToken]);

  return (
    <>
      <group>
        <TokensComponent />
      </group>
      {game.currentTurn ? (
        <CurrentTurn
          currentTurn={game.currentTurn}
          isFinished={game.isFinishGame}
        />
      ) : null}
    </>
  );
};

export default memo(PlayGame);
