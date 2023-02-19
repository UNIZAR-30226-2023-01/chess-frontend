import Layout from '@/components/Layout';

export default function Home() {
  return (
    <div className='w-full'>
      pepe
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

export async function getServerSideProps({req}) {
  const res = await fetch('http://localhost:4000/api/v1/verify', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Cookie': req.headers.cookie,
    },
  });

  if (res.status === 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
