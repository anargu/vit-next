import Head from 'next/head'
import { SavedPage } from '@/src/pages/saved'
import { SEO } from '@/src/core/constants'

export default function Saved() {
  return (
    <div>
      <Head>
        <title>Saved Posts - {SEO.titleVITPhrase}</title>
      </Head>
      
      <SavedPage/>
    </div>
  )
}

