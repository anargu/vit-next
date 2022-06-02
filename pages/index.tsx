import Head from 'next/head'

// import { SearchBar } from '@/src/components/SearchBar'
import { MeiliSearchBar } from '@/src/components/MeiliSearch'
import { IndexPage } from '@/src/pages'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <IndexPage/>
    </div>
  )
}
