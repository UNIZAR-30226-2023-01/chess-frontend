import Layout from '@/components/Layout';

export default function Home() {
  return (
    <div className='w-full'>

    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

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
