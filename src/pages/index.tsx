import type { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { I18N_KEY_NS_GAME_PAGE } from '@/constants/common';

import MainLayout from '@/layouts/MainLayout';

export const getStaticProps: GetStaticProps<IHomePageProps> = async ({
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

const HomePage = () => {
  return <MainLayout></MainLayout>;
};

export default HomePage;
