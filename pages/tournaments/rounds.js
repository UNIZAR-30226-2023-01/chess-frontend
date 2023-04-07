import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const Bracket = dynamic(
    () => import('@/components/Bracket'),
    { ssr: false },
);

export default function Rounds() {
  return (
    <div className="px-0 sm:px-6 lg:px-8 py-12 mx-auto flex items-center justify-center">
      <Bracket/>
    </div>

  );
}

Rounds.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify`, {
    method: 'POST',
    credentials: 'include',
  }).catch((err)=>console.log(err));

  if (process.env.NODE_ENV === 'production' && !(res.ok && res.status === 200)) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

