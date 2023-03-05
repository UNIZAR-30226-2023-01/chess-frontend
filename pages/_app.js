import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <div className='scroll-smooth hover:scroll-auto'>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
