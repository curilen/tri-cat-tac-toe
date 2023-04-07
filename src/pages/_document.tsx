import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

const Document = (props: DocumentProps) => {
  const defaultLocale = props?.locale || process.env.GAME_DEFAULT_LOCALE || '';
  return (
    <Html lang={defaultLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
