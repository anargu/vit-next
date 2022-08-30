import Head from 'next/head'
import { AboutPage } from '@/src/pages/about'

export default function About() {
  return (
    <div>
      <Head>
        <title>About - VIT: Very Interesting Things</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AboutPage/>
    </div>
  )
}


