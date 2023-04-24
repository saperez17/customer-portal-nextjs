import '../styles/global.css';

import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <CookiesProvider>
    <Component {...pageProps} />
  </CookiesProvider>
);

export default MyApp;
