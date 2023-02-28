import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const Bracket = dynamic(
    () => import('@/components/Bracket'),
    { ssr: false },
);

export default function Tournaments() {
  return (
    <Bracket/>
  );
}

Tournaments.getLayout = (page) => <Layout>{page}</Layout>;
