import { Suspense, useRef } from 'react';
import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { Camera } from 'three/src/cameras/Camera';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';
import { GAME_BACKGROUND_COLOR, LIGHT_COLOR } from '@/constants/colors';

import MainLayout from '@/layouts/MainLayout';
import MainCamera from '@/components/Game/MainCamera';
import Board from '@/components/Game/Board';

export const getStaticProps: GetStaticProps<IGamePageProps> = async ({
  locale,
}) => {
  const pageLocale = locale || process.env.GAME_DEFAULT_LOCALE;
  const translations = await serverSideTranslations(pageLocale, [
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

  return (
    <MainLayout>
      <Canvas>
        <MainCamera ref={cameraRef} />

        <ambientLight intensity={0.5} color={LIGHT_COLOR} />
        <color attach="background" args={[GAME_BACKGROUND_COLOR]} />

        <Suspense fallback={null}>
          <Board />

          <OrbitControls camera={cameraRef.current || undefined} />
        </Suspense>
      </Canvas>
    </MainLayout>
  );
};
export default GamePage;
