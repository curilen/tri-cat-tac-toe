import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const I18N_KEY_NS_PAGE = 'game-page';

export const getStaticProps: GetStaticProps<IGamePageProps> = async ({
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

const GamePage = () => {
  const { t } = useTranslation([I18N_KEY_NS_PAGE]);
  return <section>{t(`${I18N_KEY_NS_PAGE}:info.description`)}</section>;
};
export default GamePage;
