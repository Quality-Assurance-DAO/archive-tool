// _document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Archive Tool for communities" />
        <link rel="icon" type="image/png" sizes="300x300" href="/favicon.png" /> 
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}