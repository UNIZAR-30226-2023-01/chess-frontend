import '@/styles/globals.css';
import {ChessProvider} from '@/context/ChessContext';
import {ThemeProvider} from '@/context/ThemeContext';
import { GameProvider } from '@/context/GameContext';
import {Toaster} from 'react-hot-toast';
import Meta from '@/components/Meta';
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider>
      <GameProvider
        token={pageProps?.user?.token}
      >
        <ChessProvider>
          <Toaster position='top-right' />
          <Meta/>
          <div className='scroll-smooth hover:scroll-auto'>
            {getLayout(<Component {...pageProps} />)}
          </div>
          <Analytics
            beforeSend={(event) => {
              const url = new URL(event.url);
              let pathname = url.pathname.split('/').slice(0, 3).join('/');
              if (pathname.includes('/u/')) pathname = pathname.split('/').slice(0, 2).join('/');
              if (pathname.includes('/games/')) pathname = pathname.split('/').slice(0, 2).join('/');
              if (pathname.includes('/tournaments/')) pathname = pathname.split('/').slice(0, 2).join('/');
              url.pathname = pathname;
              return {
                ...event,
                url: url.toString(),
              };
            }}/>
        </ChessProvider>
      </GameProvider>
    </ThemeProvider>
  );
}
