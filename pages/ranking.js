import Layout from '@/components/Layout';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { ranking } from '@/data/stats';

export default function Ranking() {
  return (
    <div className="px-0 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Clasificación</h1>
          <p className="mt-2 text-sm text-left text-gray-700 dark:text-gray-200">
            Listado de resultados de todos los usuarios.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 mb-6">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 ">
            <table className="min-w-full divide-y divide-gray-300 relative">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="select-none py-3.5 pl-4 pr-3 text-left text-sm font-semibold capitalize text-gray-900 dark:text-white sm:pl-6 md:pl-0"
                  >
                    calification
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold capitalize text-gray-900 dark:text-white">
                    Player
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Score
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Victory
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Draw
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 sm:pr-6 md:pr-0 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-gray-200">
                    Defeat
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ranking.map((person) => (
                  <tr key={person.email}>
                    <td className="select-none whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      <span className='px-2 py-1 rounded-md bg-gray-100 font-medium'>
                        # {person.calification}
                      </span>
                    </td>
                    <td className="select-none whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-200">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src={person.player.image} alt="" />
                        </div>
                        <div className="ml-4 flex items-center gap-x-2">
                          <div className="font-medium bg-red-500 px-1 py-0.5 rounded-md text-gray-50 text-xs uppercase">
                            {person.tag}
                          </div>
                          <div className="text-gray-500 dark:text-gray-200">{person.player.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{person.score}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{person.victories}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{person.draws}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{person.defeats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <nav className="max-w-5xl bg-white dark:bg-gray-800 pb-12 w-full flex items-center justify-between border-gray-200 px-4 sm:px-0 fixed bottom-0 border-t">
          <div className="-mt-px flex w-0 flex-1">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-200" aria-hidden="true" />
              Previous
            </a>
          </div>
          <div className="hidden md:-mt-px md:flex">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700"
            >
              1
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-indigo-500 dark:border-indigo-00 px-4 pt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400"
              aria-current="page"
            >
              2
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700"
            >
              3
            </a>
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-200">
              ...
            </span>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700"
            >
              8
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700"
            >
              9
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700"
            >
              10
            </a>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400 dark:text-gray-200" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}


Ranking.getLayout = (page) =><Layout>{page}</Layout>;

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.log(err));

  if (!res.ok || res.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { },
  };
}
