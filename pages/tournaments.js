import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const Bracket = dynamic(
    () => import('@/components/Bracket'),
    { ssr: false },
);

export default function Tournaments() {
  return (
    <div className="px-0 sm:px-6 lg:px-8 py-12 mx-auto flex items-center justify-center">
      <Bracket/>
    </div>
  );
}

Tournaments.getLayout = (page) => <Layout>{page}</Layout>;
