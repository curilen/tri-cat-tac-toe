import { memo, useCallback, useMemo } from 'react';

import GameLogic from '@/gameLogic';
import GameToken from '@/components/Game/GameToken';

interface IPlayGameProps {
  game: GameLogic;
}

const PlayGame = ({ game }: IPlayGameProps) => {
  const tokenList = useMemo(
    () => game.gameSettings?.getTokenList() || [],
    [game.gameSettings]
  );

  const TokensComponent = useCallback(() => {
    return (
      <>
        {tokenList.map((token, idx) => {
          const value = game.tokenSelected[idx];
          return <GameToken key={`token-${idx}`} {...token} value={value} />;
        })}
      </>
    );
  }, [tokenList, game.tokenSelected]);

  return (
    <group>
      <TokensComponent />
    </group>
  );
};

export default memo(PlayGame);
