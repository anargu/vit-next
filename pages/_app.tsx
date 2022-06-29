import { WithNotificationsProvider } from '@/src/components/Notification/Notification'
import '@/styles/global.css'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WithNotificationsProvider>
      <Component {...pageProps} />
    </WithNotificationsProvider>
  );
}
