import '@/styles/globals.css';
import {ChessProvider} from '@/context/ChessContext';
import {ThemeProvider} from '@/context/ThemeContext';
import { GameProvider } from '@/context/GameContext';
import {Toaster} from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider>
      <GameProvider
        token={pageProps?.user?.token}
      >
        <ChessProvider>
          <Toaster position='top-right' />
          <div className='scroll-smooth hover:scroll-auto'>
            {getLayout(<Component {...pageProps} />)}
          </div>
        </ChessProvider>
      </GameProvider>
    </ThemeProvider>
  );
}
