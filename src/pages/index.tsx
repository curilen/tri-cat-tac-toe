import type { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/layouts/MainLayout';

const I18N_KEY_NS_PAGE = 'game-page';

export const getStaticProps: GetStaticProps<IHomePageProps> = async ({
  locale,
}) => {
  const pageLocale = locale || process.env.GAME_DEFAULT_LOCALE;
  const translations = await serverSideTranslations(pageLocale, [
    I18N_KEY_NS_PAGE,
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
