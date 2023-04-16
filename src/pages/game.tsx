import { Suspense, useCallback, useRef, useState } from 'react';
import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

import type { Camera } from 'three/src/cameras/Camera';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import { GAME_BACKGROUND_COLOR, LIGHT_COLOR } from '@/constants/colors';

import GameLogic from '@/gameLogic/';

import MainLayout from '@/layouts/MainLayout';
import MainCamera from '@/components/Game/MainCamera';
import GameBoard from '@/components/Game/GameBoard';
import GameTitle from '@/components/Game/GameTitle';
import GameOptions from '@/components/Game/GameOptions';
const ScoreBoard = dynamic(import('@/components/Game/ScoreBoard'));
const PlayGame = dynamic(import('@/components/Game/PlayGame'));

export const getStaticProps: GetStaticProps<IGamePageProps> = async ({
  locale,
}) => {
  const pageLocale = locale || process.env.GAME_DEFAULT_LOCALE;
  const translations = await serverSideTranslations(pageLocale, [
    'common',
    I18N_KEY_NS_GAME_PAGE,
  ]);

  return {
    props: {
      ...translations,
    },
  };
};

const GamePage = () => {
  const cameraRef = useRef<Camera | null>(null);
  const [gameLogic, setGameLogic] = useState(() => new GameLogic());

  const handleFinisGameOptionStage = (value: string, refId?: string) => {
    if (!gameLogic.gameOptions) {
      return;
    }
    setGameLogic((prevState) => {
      prevState?.gameOptions?.finishStage(value, refId);
      if (prevState.gameOptions?.isComplete) {
        prevState.startGame();
      }
      return prevState.clone();
    });
  };

  const handlePreviousStageGameOptions = useCallback(() => {
    setGameLogic((prevState) => {
      //TODO: Review reactStrictMode, execute twice
      prevState?.gameOptions?.previousStage();
      return prevState.clone();
    });
  }, []);

  const handleOnFinishGame = (newGame: GameLogic) =>
    setGameLogic(newGame.clone());

  const handleRematch = () => {
    setGameLogic((prevState) => {
      prevState.startGame();
      return prevState.clone();
    });
  };

  return (
    <MainLayout>
      <Canvas>
        <MainCamera ref={cameraRef} />

        <ambientLight intensity={1} color={LIGHT_COLOR} />
        <color attach="background" args={[GAME_BACKGROUND_COLOR]} />

        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <GameTitle />

            <GameBoard>
              {!gameLogic.canPlay && gameLogic.gameOptions ? (
                <GameOptions
                  options={gameLogic.gameOptions}
                  finishStage={handleFinisGameOptionStage}
                  handlePreviousStage={handlePreviousStageGameOptions}
                />
              ) : null}
              {gameLogic.canPlay ? (
                <PlayGame
                  game={gameLogic}
                  onFinishGame={handleOnFinishGame}
                  onClickRematch={handleRematch}
                />
              ) : null}
            </GameBoard>

            {gameLogic.canPlay && gameLogic.gameOptions?.players ? (
              <ScoreBoard players={gameLogic.gameOptions.players} />
            ) : null}
          </group>
          <OrbitControls camera={cameraRef.current || undefined} />
        </Suspense>
      </Canvas>
    </MainLayout>
  );
};
export default GamePage;
