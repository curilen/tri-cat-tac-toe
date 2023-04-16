import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';

import { BOARD_TEXT_COLOR, CURRENT_TURN_VALUE_COLOR } from '@/constants/colors';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import { CURRENT_TURN_VALUE_POSITION } from '@/constants/positions';

import GameText from '@/components/Game/GameText';

interface ICurrentTurnProps {
  currentTurn: IGamePlayers;
}

const CurrentTurn = ({ currentTurn }: ICurrentTurnProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);

  return (
    <group>
      <Center disableY position={[0, 0.8, 0.3]}>
        <GameText color={BOARD_TEXT_COLOR} size={0.5}>
          {t(`${I18N_KEY_NS_GAME_PAGE}:currentGameInfo.currentTurn.title`) ||
            ''}
        </GameText>
      </Center>
      <Center disableY position={[0, 0.8, 0.3]}>
        <GameText
          color={CURRENT_TURN_VALUE_COLOR}
          size={1}
          position={CURRENT_TURN_VALUE_POSITION}
        >
          {currentTurn.token}
        </GameText>
      </Center>
      <Center disableY position={[0, -1.5, 0.3]}>
        <GameText color={BOARD_TEXT_COLOR} size={0.4}>
          {currentTurn.displayName}
        </GameText>
      </Center>
    </group>
  );
};

export default CurrentTurn;
