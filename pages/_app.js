import '@/styles/globals.css';
import {ChessProvider} from '@/context/ChessContext';
import {ThemeProvider} from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { GameProvider } from '@/context/GameContext';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider>
      <GameProvider
        token={pageProps?.user?.token}
      >
        <ChessProvider>
          <Toaster position="top-center" reverseOrder={false}/>
          <div className='scroll-smooth hover:scroll-auto'>
            {getLayout(<Component {...pageProps} />)}
          </div>
        </ChessProvider>
      </GameProvider>
    </ThemeProvider>
  );
}
