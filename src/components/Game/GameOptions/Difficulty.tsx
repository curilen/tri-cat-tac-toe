import { useTranslation } from 'next-i18next';

import { GAME_OPTIONS_DIFFICULTY } from '@/constants/game';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';

import OptionButton from '@/components/Game/OptionButton';
import { memo } from 'react';

interface IGameOptionsDifficultyProps {
  baseKeyTranslation: string;
  handleOption: (value?: string, id?: string) => void;
}

const GameOptionsDifficulty = ({
  baseKeyTranslation,
  handleOption,
}: IGameOptionsDifficultyProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);

  return (
    <group>
      <OptionButton
        id={GAME_OPTIONS_DIFFICULTY.Easy}
        positionX={-2}
        text={t(
          `${baseKeyTranslation}.options.${GAME_OPTIONS_DIFFICULTY.Easy}`
        )}
        textSize={0.4}
        onClick={handleOption}
      />
      <OptionButton
        id={GAME_OPTIONS_DIFFICULTY.Medium}
        positionX={2}
        text={t(
          `${baseKeyTranslation}.options.${GAME_OPTIONS_DIFFICULTY.Medium}`
        )}
        textSize={0.4}
        onClick={handleOption}
      />
      {/*
        <OptionButton
          id={GAME_OPTIONS_DIFFICULTY.Hard}
          positionX={3}
          text={t(
            `${baseKeyTranslation}.options.${GAME_OPTIONS_DIFFICULTY.Hard}`
          )}
          textSize={0.4}
          onClick={handleOption}
        />
        */}
    </group>
  );
};

export default memo(GameOptionsDifficulty);
