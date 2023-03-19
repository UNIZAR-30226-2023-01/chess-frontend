import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Chessboard } from 'react-chessboard';
const stats = [
  { name: 'Partidas ganadas', stat: '2897', previousStat: '2797', change: '12%', changeType: 'increase' },
  { name: 'Clasificación', stat: '500', previousStat: '413', change: '2.02%', changeType: 'decrease' },
  { name: 'Logros obtenidos', stat: '70%', previousStat: '50%', change: '4.05%', changeType: 'increase' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Games() {
  return (
    <>
      <div>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{item.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {item.stat}
                  <span className="ml-2 text-sm font-medium text-gray-500">desde {item.previousStat}</span>
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
      <div className="mt-5 grid grid-cols-1 gap-y-4overflow-hidden rounded-lg md:grid-cols-3 gap-y-4">
        {[1, 2, 3].map((item) => (
          <Link
            key={item}
            href="#"
            className='cursor-pointer col-span-2 relative w-full bg-white shadow p-2 border-l-4 border-emerald flex items-center gap-x-4 rounded-lg'
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
                          Hace un mes
                </div>
              </div>
              <div>
                <div className='font-semibold'>
                          Victoria
                </div>
                <div className='text-sm'>
                          11m 21s
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
