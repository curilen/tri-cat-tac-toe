import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '@/configs/initTextGeometry';
import '@/styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(App);
