import Head from 'next/head'
import { LoginPage } from '@/src/pages/login'
import { SEO } from '@/src/core/constants'

export default function Saved() {
  return (
    <div>
      <Head>
        <title>Login - {SEO.titleVITPhrase}</title>
      </Head>

      <LoginPage/>
    </div>
  )
}

