import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
  return (
    <>
      <Head>
        <title>Tri-Cat-Tac-Toe</title>
        <meta name="description" content="Tri-Cat-Tac-Toe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
};

export default HomePage;
