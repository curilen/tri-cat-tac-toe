import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';

import { BOARD_TEXT_COLOR, CURRENT_TURN_VALUE_COLOR } from '@/constants/colors';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';

import GameText from '@/components/Game/GameText';
import { CURRENT_TURN_VALUE_POSITION } from '@/constants/positions';
import GameButton from '../GameButton';

interface IGameOverProps {
  winner: IGamePlayers | null;
}

const GameOver = ({ winner }: IGameOverProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);

  return (
    <group>
      <Center disableY position={[0, 1.5, 0.3]}>
        <GameText color={BOARD_TEXT_COLOR} size={0.4}>
          {t(`${I18N_KEY_NS_GAME_PAGE}:currentGameInfo.gameOver.title`) || ''}
        </GameText>
      </Center>
      {winner ? (
        <>
          <Center disableY position={[0, 0.8, 0.3]}>
            <GameText color={BOARD_TEXT_COLOR} size={0.3}>
              {t(`${I18N_KEY_NS_GAME_PAGE}:currentGameInfo.gameOver.winner`) ||
                ''}
            </GameText>
          </Center>
          <Center disableY position={[0, -0.5, 0.3]}>
            <GameText color={CURRENT_TURN_VALUE_COLOR} size={0.5}>
              {winner.displayName}
            </GameText>
          </Center>
        </>
      ) : (
        <Center disableY position={[0, 1.5, 0.3]}>
          <GameText
            color={CURRENT_TURN_VALUE_COLOR}
            size={0.4}
            position={CURRENT_TURN_VALUE_POSITION}
          >
            {t(`${I18N_KEY_NS_GAME_PAGE}:currentGameInfo.gameOver.tie`) || ''}
          </GameText>
        </Center>
      )}

      <Center disableY disableZ position={[0, -1.5, 0.5]}>
        <GameButton
          text={
            t(`${I18N_KEY_NS_GAME_PAGE}:currentGameInfo.gameOver.newGame`) || ''
          }
          width={4.5}
          depth={0.5}
        />
      </Center>
    </group>
  );
};

export default memo(GameOver);
