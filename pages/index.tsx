import Head from 'next/head'

// import { SearchBar } from '@/src/components/SearchBar'
// import { MeiliSearchBar } from '@/src/components/MeiliSearch'
import { IndexPage } from '@/src/pages'
import { SEO } from '@/src/core/constants'

export default function Home() {
  return (
    <div>
      <Head>
        <title>{SEO.titleVITPhrase}</title>
      </Head>
      
      <IndexPage/>
    </div>
  )
}
