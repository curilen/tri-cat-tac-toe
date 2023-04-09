import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';

import { GAME_OPTIONS_STAGES } from '@/constants/game';
import { BOARD_TEXT_ZAXIS_MIN } from '@/constants/positions';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import { BOARD_TEXT_COLOR } from '@/constants/colors';

import GameOptionsLogic from '@/gameLogic/gameOptions';

import GameText from '@/components/Game/GameText';
import GameOptionsMode from '@/components/Game/GameOptions/Mode';

interface IGameOptionsProps {
  options: GameOptionsLogic;
  finishStage?: (value: string) => void;
}

const GameOptions = ({ options, finishStage }: IGameOptionsProps) => {
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
    const keyBaseTranslation = `${I18N_KEY_NS_GAME_PAGE}:gameOption.${options.stage}`;

    switch (options.stage) {
      case GAME_OPTIONS_STAGES.Mode:
        return (
          <GameOptionsMode
            baseKeyTranslation={keyBaseTranslation}
            handleOption={handleOption}
          />
        );
      case GAME_OPTIONS_STAGES.Difficulty:
        return <></>;
      default:
        return <></>;
    }
  }, [options, handleOption]);

  return (
    <group position={[0, 3, 0]}>
      <group>
        <Center disableY position={[0, 0, BOARD_TEXT_ZAXIS_MIN]}>
          <GameText color={BOARD_TEXT_COLOR} isTitle>
            {t(`${I18N_KEY_NS_GAME_PAGE}:gameOption.${options.stage}.title`) ||
              ''}
          </GameText>
        </Center>
      </group>

      <StageComponent />
    </group>
  );
};

export default GameOptions;
