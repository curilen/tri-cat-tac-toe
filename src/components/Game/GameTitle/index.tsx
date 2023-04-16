import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';

import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import GameText from '@/components/Game/GameText';

import { BOARD_SIZE_DEFAULT } from '@/constants/positions';

interface IGameTitleProps {
  boardSize?: number;
}
const GameTitle = ({ boardSize = BOARD_SIZE_DEFAULT }: IGameTitleProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);
  const distanceBoard = useMemo(() => Math.round(boardSize / 1.8), [boardSize]);

  return (
    <Center disableY top>
      <group position={[0, distanceBoard, 0]}>
        <GameText
          value={t(`${I18N_KEY_NS_GAME_PAGE}:info.title`) || ''}
          isTitle
          size={1.3}
          height={0.3}
        />
      </group>
    </Center>
  );
};

export default memo(GameTitle);
