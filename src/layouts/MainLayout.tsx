import Head from 'next/head';
import type { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

interface IMainLayoutProps {
  children?: ReactNode;
}

const I18N_KEY_NS_PAGE = 'game-page';

const MainLayout = ({ children }: IMainLayoutProps) => {
  const { t } = useTranslation([I18N_KEY_NS_PAGE]);

  return (
    <>
      <Head>
        <title>{t(`${I18N_KEY_NS_PAGE}:info.title`)}</title>
        <meta
          name="description"
          content={t(`${I18N_KEY_NS_PAGE}:info.description`) || ''}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-game">{children}</main>
    </>
  );
};

export default MainLayout;
