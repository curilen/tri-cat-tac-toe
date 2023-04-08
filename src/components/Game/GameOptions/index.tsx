import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

import {
  GAME_OPTIONS_MODE,
  GAME_OPTIONS_STAGES,
  GAME_STAGE_DEFAULT,
} from '@/constants/game';
import { BOARD_TEXT_ZAXIS_MIN } from '@/constants/positions';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import { BOARD_TEXT_COLOR } from '@/constants/colors';

import GameText from '@/components/Game/GameText';
import OptionButton from '@/components/Game/OptionButton';

interface IGameOptionsProps {
  option?: GAME_OPTIONS_STAGES;
}

const GameOptions = ({ option = GAME_STAGE_DEFAULT }: IGameOptionsProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);

  const handleOption = (event: ThreeEvent<MouseEvent>) => {
    console.log('agaha', event);
  };

  const StageComponent = useCallback(() => {
    const keyBaseTranslation = `${I18N_KEY_NS_GAME_PAGE}:gameOption.${option}`;
    return (
      <group>
        <OptionButton
          positionX={-2}
          text={t(
            `${keyBaseTranslation}:options.${GAME_OPTIONS_MODE.OneVSOne}`
          )}
          textSize={0.6}
          onClick={handleOption}
        />
        <OptionButton
          positionX={2}
          text={t(
            `${keyBaseTranslation}:options.${GAME_OPTIONS_MODE.OneVSCPU}`
          )}
          textSize={0.4}
          onClick={handleOption}
        />
      </group>
    );
  }, [option, t]);

  return (
    <group position={[0, 3, 0]}>
      <group>
        <Center disableY position={[0, 0, BOARD_TEXT_ZAXIS_MIN]}>
          <GameText color={BOARD_TEXT_COLOR} isTitle>
            {t(`${I18N_KEY_NS_GAME_PAGE}:gameOption.${option}.title`) || ''}
          </GameText>
        </Center>
      </group>

      <StageComponent />
    </group>
  );
};

export default GameOptions;
