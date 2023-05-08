import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {sites} from '@/data/sitemap';

export default function Sitemap() {
  return (
    <div className='max-w-xl mx-auto flex flex-col gap-y-4 py-12 antialiased px-4 sm:px-0'>
      <h1 className='text-2xl font-bold py-4'>Reign Sitemap</h1>
      <div className='grid grid-cols-4 gap-y-3 gap-x-4'>
        {sites.sort().map((site, index) => (
          <Link
            key={index}
            href={site.url}
            className='flex flex-col gap-y-2 text-left w-full tracking-wide text-blue-600'
          >
            {site.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

Sitemap.getLayout = (page) => {
  return (
    <div className='w-full'>
      <Navbar/>
      <main className='container mx-auto'>
        {page}
      </main>
      <Footer/>
    </div>
  );
};
