import { useTranslation } from 'next-i18next';

import { GAME_OPTIONS_MODE } from '@/constants/game';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';

import OptionButton from '@/components/Game/OptionButton';
import { memo } from 'react';

interface IGameOptionsModeProps {
  baseKeyTranslation: string;
  handleOption: (id?: string) => void;
}

const GameOptionsMode = ({
  baseKeyTranslation,
  handleOption,
}: IGameOptionsModeProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);

  return (
    <group>
      <OptionButton
        id={GAME_OPTIONS_MODE.OneVSOne}
        positionX={-2}
        text={t(`${baseKeyTranslation}.options.${GAME_OPTIONS_MODE.OneVSOne}`)}
        textSize={0.6}
        onClick={handleOption}
      />
      <OptionButton
        id={GAME_OPTIONS_MODE.OneVSCPU}
        positionX={2}
        text={t(`${baseKeyTranslation}.options.${GAME_OPTIONS_MODE.OneVSCPU}`)}
        textSize={0.4}
        onClick={handleOption}
      />
    </group>
  );
};

export default memo(GameOptionsMode);
