import '@/styles/global.css';

import { Noto_Sans_Thai } from 'next/font/google';

const noto = Noto_Sans_Thai({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={noto.className}>
      <Component {...pageProps} />
    </main>
  )
}
