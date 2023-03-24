import '@/styles/globals.css';
import {ChessProvider} from '@/context/ChessContext';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ChessProvider>
      <div className='scroll-smooth hover:scroll-auto'>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </ChessProvider>
  );
}
