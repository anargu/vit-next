import NavBar from '@/src/components/NavBar';
import { WithNotificationsProvider } from '@/src/components/Notification/Notification'
import '@/styles/global.css'
import type { AppProps } from 'next/app'
import PageTransition from '../src/components/Transitions/PageTransition';

export default function VITApp({ Component, pageProps }: AppProps) {
  return (
    <WithNotificationsProvider>
      <NavBar/>

      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </WithNotificationsProvider>
  );
}
