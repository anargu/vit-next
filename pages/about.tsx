import Head from 'next/head'
import { AboutPage } from '@/src/pages/about'
import { SEO } from '@/src/core/constants'

export default function About() {
  return (
    <div>
      <Head>
        <title>About - {SEO.titleVITPhrase}</title>
      </Head>
      
      <AboutPage/>
    </div>
  )
}


