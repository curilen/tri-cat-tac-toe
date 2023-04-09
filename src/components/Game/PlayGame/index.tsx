import { memo } from 'react';

import GameLogic from '@/gameLogic';
import GameToken from '@/components/Game/GameToken';

interface IPlayGameProps {
  game: GameLogic;
}

const PlayGame = ({ game }: IPlayGameProps) => {
  console.log(game);
  return (
    <group>
      <GameToken />
    </group>
  );
};

export default memo(PlayGame);
