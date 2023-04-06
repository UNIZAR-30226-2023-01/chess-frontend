import Layout from '@/components/Layout';
import { useAuth } from '@/context/userContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">estás logueado</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">inicia sesión plis</h1>
      </div>
    );
  }
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
