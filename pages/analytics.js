import Layout from '@/components/Layout';
import { Chessboard } from 'react-chessboard';
import { PlayIcon, EyeIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

const stats = [
  { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Analytics() {
  return (
    <div className="px-0 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Analiticas</h1>
          <p className="mt-2 text-sm text-left text-gray-700 dark:text-gray-200">
            Listado de resultados de todas tus partidas.
          </p>
        </div>
      </div>
      {/* Estadisticas */}
      <div>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{item.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {item.stat}
                  <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
                </div>

                <div
                  className={classNames(
                  item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                  )}
                >
                  {item.changeType === 'increase' ? (
                  <ArrowUpIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {/* Card */}
      <div className="mt-5 grid grid-cols-1 gap-y-4overflow-hidden rounded-lg md:grid-cols-3 gap-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className='col-span-2 relative w-full bg-white shadow p-2 border-l-4 border-emerald flex items-center gap-x-4 rounded-lg'
          >
            {/* <div className='w-28 h-28 bg-gray-800'/> */}
            <div className='w-24 h-24 bg-gray-50/20 select-none relative'>
              <div className='w-24 h-24 absolute top-0 left-0 z-10'/>
              <Chessboard
                key={item}
                id="BasicBoard"
                position='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
                boardOrientation='white'
              />
            </div>
            <div className='flex flex-col justify-around space-y-3' >
              <div>
                <div className='font-semibold'>
                Competitiva
                </div>
                <div className='text-sm'>
                a month ago
                </div>
              </div>
              <div>
                <div className='font-semibold'>
                Victory
                </div>
                <div className='text-sm'>
                11m 21s
                </div>
              </div>
            </div>
            <div className='absolute h-full right-0 bg-gray-100 rounded-r-lg flex flex-col divide-y divide-black/20'>
              <button className='flex-1 flex items-center hover:bg-gray-500/10 px-2 rounded-tr-lg duration-300'>
                <PlayIcon className='w-6 h-6'/>
              </button>
              <button className='flex-1 flex items-center hover:bg-gray-500/10 px-2 rounded-br-lg duration-300'>
                <EyeIcon className='w-6 h-6'/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Analytics.getLayout = (page) => <Layout>{page}</Layout>;
