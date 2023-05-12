import Layout from '@/components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import useSWR from 'swr';
import { getElo } from '@/lib/elo';
import jwt from 'jsonwebtoken';

const fetcher = (url) => fetch(url, {credentials: 'include'}).then((res) => res.json());

export default function Ranking() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/users?limit=10&page=${pageIndex}&sort=-elo`, fetcher, {
    refreshInterval: 1000 * 60 * 3,
  });

  return (
    <div className="py-12 max-w-5xl mx-auto px-0 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Clasificación</h1>
          <p className="mt-2 text-sm text-left text-gray-700 dark:text-gray-200">
            Listado de resultados de todos los usuarios.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 mb-1">
          <div className="inline-block min-w-full align-middle md:px-6 lg:px-8 ">
            <table className="min-w-full divide-y divide-gray-300 relative">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="select-none py-3.5 pl-4 pr-3 text-left text-sm font-semibold capitalize text-gray-900 dark:text-white sm:pl-6 md:pl-0"
                  >
                    Clasificación
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold capitalize text-gray-900 dark:text-white">
                    Jugador
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Elo
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Victorias
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Empates
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 sm:pr-6 md:pr-0 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-gray-200">
                    Derrotas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.data.map((user, index) => (
                  <tr key={user.id}>
                    <td className="select-none whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      <span className='px-2 py-1 rounded-md bg-gray-100 font-medium'>
                        # {(pageIndex - 1) * 10 + index + 1}
                      </span>
                    </td>
                    <td className="select-none whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-200">
                      <Link href={`/u/${user.id}`} className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src={`/assets${user?.avatar}`} alt={user?.avatar} />
                        </div>
                        <div className="ml-4 flex items-center gap-x-2">
                          {getElo(user.elo) &&
                            <div className="font-medium bg-red-500 px-1 py-0.5 rounded-md text-gray-50 text-xs uppercase">
                              {getElo(user.elo)}
                            </div>
                          }
                          <div className="text-gray-500 dark:text-gray-200 capitalize">{user.username}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{user.elo}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{user.stats.bulletWins + user.stats.blitzWins + user.stats.fastWins}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{user.stats.bulletDraws + user.stats.blitzDraws + user.stats.fastDraws}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{user.stats.bulletDefeats + user.stats.blitzDefeats + user.stats.fastDefeats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <nav className="max-w-5xl bg-white dark:bg-gray-800 pb-12 w-full flex items-center justify-between border-gray-200 border-t">
          <div className="-mt-px flex w-0 flex-1">
            <button
              onClick={() => setPageIndex(pageIndex - 1)}
              className={`${data?.meta.nextPage === null && 'cursor-not-allowed'} inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700`}
              disabled={data?.meta.previousPage === null || pageIndex === 0}
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-200" aria-hidden="true" />
              Anterior
            </button>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <button
              onClick={() => setPageIndex(pageIndex + 1)}
              className={`${data?.meta.nextPage === null && 'cursor-not-allowed'} inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700`}
              disabled={data?.meta.nextPage === null || pageIndex === data?.meta.pages}
            >
              Siguiente
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400 dark:text-gray-200" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}


Ranking.getLayout = (page) =><Layout>{page}</Layout>;

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  if (!res.ok || res.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const decoded = jwt.decode(req.headers.cookie.split('=')[1]);
  const token = req.headers.cookie?.split('=')[1];

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
