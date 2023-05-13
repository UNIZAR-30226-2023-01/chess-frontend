import Layout from '@/components/Layout';
import Game from '@/components/Game';
import useSWR from 'swr';
import jwt from 'jsonwebtoken';

const fetcher = (url) => fetch(url, {credentials: 'include'})
    .then(async (res) => {
      const data = await res.json();
      return data?.data;
    });

export default function Home() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/games?limit=30&filter={"gameType":"COMPETITIVE"}`, fetcher, { refreshInterval: 1000 * 60 * 3 });
  return (
    <div className="py-12 max-w-6xl mx-auto px-0 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Partidas</h1>
          <p className="mt-2 text-sm text-left text-gray-700 dark:text-gray-200">
            Listado de partidas competitivas en curso.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="flex flex-wrap gap-6 justify-items-center md:grid-cols-2 mt-6">
          {data?.map((item) => <Game key={item.id} game={item}/>)}
        </div>
      </div>
    </div>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=> console.error(err));

  if (!res.ok || res.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const newQueryString = req.headers.cookie.replace(/;/g, '&');
  const cookies = new URLSearchParams(newQueryString);
  const token = cookies.get('api-auth');
  const decoded = jwt.decode(token);

  return {
    props: {
      user: {
        id: decoded.id,
        username: decoded.username,
        token,
      },
    },
  };
}
