import { WithNotificationsProvider } from '@/src/components/Notification/Notification'
import '@/styles/global.css'
import type { AppProps } from 'next/app'
import PageTransition from '../src/components/Transitions/PageTransition';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WithNotificationsProvider>
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </WithNotificationsProvider>
  );
}
