import '@/styles/global.css';

import { Noto_Sans_Thai } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const noto = Noto_Sans_Thai({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (!accessToken) {
      router.replace('/login')
    }

  }, []);

  return (
    <main className={noto.className}>
      <Component {...pageProps} />
    </main>
  )
}
