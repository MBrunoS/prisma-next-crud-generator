export const _app = `
import { AppProps } from 'next/app';
import './global.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return <Component {...pageProps} />;
}
`;
