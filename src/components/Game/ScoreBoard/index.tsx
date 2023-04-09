import { memo, useCallback } from 'react';
import { Center } from '@react-three/drei';
import { useTranslation } from 'next-i18next';

import {
  SCORE_BOARD_VALUE_POSITION,
  SIDE_BOARDS_ROTATION,
} from '@/constants/positions';
import {
  GAME_BOARD_TEXTURES,
  GAME_BOARD_TEXTURES_CONFIG,
} from '@/constants/textures';
import {
  BOARD_TEXT_COLOR,
  SCOREBOARD_VALUE_COLOR,
  TEXT_DEFAULT_COLOR,
} from '@/constants/colors';
import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import useMyTextures from '@/hooks/useMyTextures';

import GameText from '@/components/Game/GameText';

interface IScoreBoardProps {
  players: IGamePlayers[];
}

const ScoreBoard = ({ players }: IScoreBoardProps) => {
  const { t } = useTranslation([I18N_KEY_NS_GAME_PAGE]);
  const { textures } = useMyTextures(GAME_BOARD_TEXTURES);

  const Data = useCallback(() => {
    if (!players || players.length < 1) {
      return <></>;
    }

    const playersScore = players.map((player, idx) => {
      return (
        <group key={`score-${idx}`} position={[-2, -(idx * 1.2), 0.5]}>
          <GameText color={TEXT_DEFAULT_COLOR} size={0.5}>
            {player.displayName}
          </GameText>
          <GameText
            color={SCOREBOARD_VALUE_COLOR}
            size={0.8}
            position={SCORE_BOARD_VALUE_POSITION}
          >
            {String(player.won || 0)}
          </GameText>
        </group>
      );
    });

    return <>{playersScore}</>;
  }, [players]);

  return (
    <group position={[-10, 0, 2]} rotation={[0, SIDE_BOARDS_ROTATION, 0]}>
      <mesh>
        <boxGeometry attach="geometry" args={[5, 5, 0.5]} />
        <meshStandardMaterial
          attach="material"
          {...textures}
          {...GAME_BOARD_TEXTURES_CONFIG}
        />
      </mesh>
      <group>
        <Center disableY position={[0, 1.5, 0.3]}>
          <GameText color={BOARD_TEXT_COLOR} size={0.5}>
            {t(`${I18N_KEY_NS_GAME_PAGE}:scoreboard.title`) || ''}
          </GameText>
        </Center>
        <Data />
      </group>
    </group>
  );
};

export default memo(ScoreBoard);
