import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';

import { GAME_OPTIONS_STAGES } from '@/constants/game';
import {
  BOARD_TEXT_ZAXIS_MIN,
  BUTTON_PREVIOUS_STAGE_POSITION,
} from '@/constants/positions';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import { BOARD_TEXT_COLOR } from '@/constants/colors';

import GameOptionsLogic from '@/gameLogic/gameOptions';

import GameText from '@/components/Game/GameText';
import GameOptionsMode from '@/components/Game/GameOptions/Mode';
import GameOptionsDifficulty from '@/components/Game/GameOptions/Difficulty';
import GameOptionsChooseToken from '@/components/Game/GameOptions/ChooseToken';
import GameButton from '@/components/Game/GameButton';

interface IGameOptionsProps {
  options: GameOptionsLogic;
  finishStage?: (value: string, id?: string) => void;
  handlePreviousStage?: () => void;
}

const GameOptions = ({
  options,
  finishStage,
  handlePreviousStage,
}: IGameOptionsProps) => {
  const { t } = useTranslation(['common', I18N_KEY_NS_GAME_PAGE]);
  const buttonText = useMemo(() => t('common:back') || '', [t]);
  const keyBaseTranslation = useMemo(
    () => `${I18N_KEY_NS_GAME_PAGE}:gameOption.${options.stage}`,
    [options.stage]
  );

  // Check if you want to implement more than 2 players
  const currenPlayerChoose = useMemo(
    () => (options.players ? options.players[0] : null),
    [options.players]
  );

  const handleOption = useCallback(
    (value?: string, id?: string) => {
      if (value === undefined) {
        return;
      }
      if (finishStage) {
        finishStage(value, id);
      }
    },
    [finishStage]
  );

  const StageComponent = useCallback(() => {
    switch (options.stage) {
      case GAME_OPTIONS_STAGES.Mode:
        return (
          <GameOptionsMode
            baseKeyTranslation={keyBaseTranslation}
            handleOption={handleOption}
          />
        );
      case GAME_OPTIONS_STAGES.Difficulty:
        return (
          <>
            <GameOptionsDifficulty
              baseKeyTranslation={keyBaseTranslation}
              handleOption={handleOption}
            />
            <GameButton
              text={buttonText || ''}
              onClick={handlePreviousStage}
              position={BUTTON_PREVIOUS_STAGE_POSITION}
            />
          </>
        );
      case GAME_OPTIONS_STAGES.ChooseToken:
        return (
          <>
            <GameOptionsChooseToken
              handleOption={handleOption}
              player={currenPlayerChoose}
            />
            <GameButton
              text={buttonText || ''}
              onClick={handlePreviousStage}
              position={BUTTON_PREVIOUS_STAGE_POSITION}
            />
          </>
        );
      default:
        return null;
    }
  }, [
    options,
    handleOption,
    keyBaseTranslation,
    currenPlayerChoose,
    handlePreviousStage,
    buttonText,
  ]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <group position={[0, 3, 0]}>
      <group>
        <Center disableY position={[0, 0, BOARD_TEXT_ZAXIS_MIN]}>
          <GameText color={BOARD_TEXT_COLOR} isTitle size={1}>
            {t(`${keyBaseTranslation}.title`) || ''}
          </GameText>
        </Center>
      </group>

      <StageComponent />
    </group>
  );
};

export default GameOptions;
