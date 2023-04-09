import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';

import { GAME_OPTIONS_MODE, GAME_OPTIONS_STAGES } from '@/constants/game';
import { BOARD_TEXT_ZAXIS_MIN } from '@/constants/positions';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import { BOARD_TEXT_COLOR } from '@/constants/colors';

import GameText from '@/components/Game/GameText';
import OptionButton from '@/components/Game/OptionButton';

interface IGameOptionsProps {
  option: GAME_OPTIONS_STAGES;
  finishStage?: (value: string) => void;
}

const GameOptions = ({ option, finishStage }: IGameOptionsProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);

  const handleOption = useCallback(
    (id?: string) => {
      if (id === undefined) {
        return;
      }
      if (finishStage) {
        finishStage(id);
      }
    },
    [finishStage]
  );

  const StageComponent = useCallback(() => {
    const keyBaseTranslation = `${I18N_KEY_NS_GAME_PAGE}:gameOption.${option}`;

    if (option === GAME_OPTIONS_STAGES.Mode) {
      return (
        <group>
          <OptionButton
            id={GAME_OPTIONS_MODE.OneVSOne}
            positionX={-2}
            text={t(
              `${keyBaseTranslation}:options.${GAME_OPTIONS_MODE.OneVSOne}`
            )}
            textSize={0.6}
            onClick={handleOption}
          />
          <OptionButton
            id={GAME_OPTIONS_MODE.OneVSCPU}
            positionX={2}
            text={t(
              `${keyBaseTranslation}:options.${GAME_OPTIONS_MODE.OneVSCPU}`
            )}
            textSize={0.4}
            onClick={handleOption}
          />
        </group>
      );
    } else if (option === GAME_OPTIONS_STAGES.Difficulty) {
      return <></>;
    } else {
      return <></>;
    }
  }, [option, t, handleOption]);

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
