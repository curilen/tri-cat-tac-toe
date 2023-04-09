import { GAME_TOKENS } from '@/constants/game';

import OptionButton from '@/components/Game/OptionButton';
import { memo } from 'react';

interface IGameOptionsChooseTokenProps {
  player?: IGamePlayers | null;
  handleOption: (value?: string, id?: string) => void;
}

const GameOptionsChooseToken = ({
  player,
  handleOption,
}: IGameOptionsChooseTokenProps) => {
  const wrapperHandleOption = (value?: string) => {
    return handleOption(value, player?.id);
  };

  return (
    <group>
      <OptionButton
        id={GAME_TOKENS.X}
        positionX={-2}
        text={GAME_TOKENS.X}
        textSize={1}
        onClick={wrapperHandleOption}
      />
      <OptionButton
        id={GAME_TOKENS.O}
        positionX={2}
        text={GAME_TOKENS.O}
        textSize={1}
        onClick={wrapperHandleOption}
      />
    </group>
  );
};

export default memo(GameOptionsChooseToken);
