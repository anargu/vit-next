import Head from 'next/head'
import { SavedPage } from '@/src/pages/saved'

export default function Saved() {
  return (
    <div>
      <Head>
        <title>Saved Posts - VIT: Very Interesting Things</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SavedPage/>
    </div>
  )
}

