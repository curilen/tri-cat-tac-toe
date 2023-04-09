import { memo } from 'react';
import { Center } from '@react-three/drei';
import { useTranslation } from 'next-i18next';

import {
  CURRENT_TURN_VALUE_POSITION,
  SIDE_BOARDS_ROTATION,
} from '@/constants/positions';
import {
  GAME_BOARD_TEXTURES,
  GAME_BOARD_TEXTURES_CONFIG,
} from '@/constants/textures';
import { BOARD_TEXT_COLOR, CURRENT_TURN_VALUE_COLOR } from '@/constants/colors';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import useMyTextures from '@/hooks/useMyTextures';

import GameText from '@/components/Game/GameText';

interface ICurrentTurnProps {
  currentTurn: IGamePlayers;
}

const CurrentTurn = ({ currentTurn }: ICurrentTurnProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);
  const { textures } = useMyTextures(GAME_BOARD_TEXTURES);

  return (
    <group position={[10, 0, 2]} rotation={[0, -SIDE_BOARDS_ROTATION, 0]}>
      <mesh>
        <boxGeometry attach="geometry" args={[4, 4, 0.5]} />
        <meshStandardMaterial
          attach="material"
          {...textures}
          {...GAME_BOARD_TEXTURES_CONFIG}
        />
      </mesh>
      <group>
        <Center disableY position={[0, 0.8, 0.3]}>
          <GameText color={BOARD_TEXT_COLOR} size={0.5}>
            {t(`${I18N_KEY_NS_GAME_PAGE}:currentTurn.title`) || ''}
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
      </group>
    </group>
  );
};

export default memo(CurrentTurn);
