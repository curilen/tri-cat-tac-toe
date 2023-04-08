import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@react-three/drei';

import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import GameText from '@/components/Game/GameText';

import { BOARD_DISTANCE_MIN } from '@/constants/positions';

const GameTitle = () => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);

  return (
    <Center disableY top>
      <group position={[0, BOARD_DISTANCE_MIN, 0]}>
        <GameText
          value={t(`${I18N_KEY_NS_GAME_PAGE}:info.title`) || ''}
          isTitle
          size={1.5}
          height={0.3}
        />
      </group>
    </Center>
  );
};

export default memo(GameTitle);
