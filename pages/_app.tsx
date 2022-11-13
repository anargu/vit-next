declare global {
    interface Window { gtag: any; }
}

import NavBar from '@/src/components/NavBar';
import { WithNotificationsProvider } from '@/src/components/Notification/Notification'
import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect } from 'react';
import PageTransition from '../src/components/Transitions/PageTransition';

export default function VITApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
  	const handleRouteChange = (url : string) => {
  		window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
  			page_path: url,
  		});
  	};

  	router.events.on("routeChangeComplete", handleRouteChange);

  	return () => {
  	router.events.off("routeChangeComplete", handleRouteChange);
  	};
  }, [router.events]);


  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <WithNotificationsProvider>
        <NavBar/>

        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </WithNotificationsProvider>
    </>
  );
}
