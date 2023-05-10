import Link from 'next/link';
import Achivement from '@/components/Achivement';
import { Chessboard } from 'react-chessboard';
import { getElo } from '@/lib/elo';
import useSWR from 'swr';
import useTimeAgo from '@/hooks/useTimeAgo';
import useDateTimeFormat from '@/hooks/useDateTimeFormat';

const logros = [
  {
    id: 1,
    name: 'FIRST LOGIN',
    imagen: '/assets/achievements/1.png',
  },
  {
    id: 2,
    name: 'Logro 2',
    imagen: '/assets/achievements/2.png',
  },
  {
    id: 3,
    name: 'TOP 1',
    imagen: '/assets/achievements/3.png',
  },
  {
    id: 5,
    name: 'Logro 4',
    imagen: '/assets/achievements/4.png',
  },
  {
    id: 6,
    name: 'Logro 4',
    imagen: '/assets/achievements/5.png',
  },
  {
    id: 7,
    name: 'Logro 4',
    imagen: '/assets/achievements/6.png',
  },
  {
    id: 8,
    name: 'TOP 100',
    imagen: '/assets/achievements/7.png',
  },
];

export function Stats({
  name, value, text, type,
}) {
  return (
    <div className="px-4 py-5 sm:p-6">
      <dt className="text-base font-medium text-gray-900">{name}</dt>
      <dd className="mt-1 flex items-baseline justify-between flex">
        {type === 'victories' && (
          <>
            <div className="flex items-baseline text-xl font-semibold text-indigo-600">
              {value[0].toFixed(2).replace('.00', '')}
              <span className="ml-1 text-xs font-medium text-gray-500 capitalize">%{text[0]}</span>
            </div>
            /
            <div className="flex items-baseline text-xl font-semibold text-indigo-600">
              {value[1].toFixed(2).replace('.00', '')}
              <span className="ml-1 text-xs font-medium text-gray-500 capitalize">%{text[1]}</span>
            </div>
            /
            <div className="flex items-baseline text-xl font-semibold text-indigo-600">
              {value[2].toFixed(2).replace('.00', '')}
              <span className="ml-1 text-xs font-medium text-gray-500 capitalize">%{text[2]}</span>
            </div>
          </>
        )}
        {type === 'ranking' && (
          <div className="flex items-baseline text-xl font-semibold text-indigo-600">
            {value[0]}
            <span className="ml-1 text-xs font-medium text-gray-500 capitalize">{text[0]}</span>
          </div>
        )}
        {type === 'achievements' && (
          <div className="flex items-baseline text-xl font-semibold text-indigo-600">
            {Math.floor(value[0]/ 13 * 100)}%
            <span className="ml-1 text-xs font-medium text-gray-500 capitalize">Desbloqueados</span>
          </div>
        )}
      </dd>
    </div>
  );
}

export function ExampleGame({
  type,
  orientation,
  position,
  createdAt,
  updatedAt,
  state,
}) {
  const timeago = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);

  const created = new Date(createdAt);
  const updated = new Date(updatedAt);

  const diff = new Date(updated - created);
  const hours = diff.getUTCHours().toString().padStart(2, '0');
  const minutes = diff.getUTCMinutes().toString().padStart(2, '0');
  const seconds = diff.getUTCSeconds().toString().padStart(2, '0');

  return (
    <Link
      href="#"
      className='cursor-pointer relative w-full bg-white shadow p-2 border-l-4 border-emerald flex items-center gap-x-4 rounded-lg'
    >
      {/* <div className='w-28 h-28 bg-gray-800'/> */}
      <div className='w-24 h-24 bg-gray-50/20 select-none relative'>
        <div className='w-24 h-24 absolute top-0 left-0 z-10'/>
        <Chessboard
          id="BasicBoard"
          position={position || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
          boardOrientation={orientation || 'white'}
        />
      </div>
      <div className='flex flex-col justify-around space-y-3' >
        <div>
          <div className='font-semibold lowercase first-letter:capitalize'>
            {type || 'Competitiva'}
          </div>
          <span
            title={createdAtFormated}
            className="text-sm lowercase first-letter:capitalize"
          >
            {timeago}
          </span>
        </div>
        <div>
          <div className='font-semibold lowercase first-letter:capitalize'>
            {state}
          </div>
          <div className='text-sm'>
            {`${hours}h : ${minutes}m : ${seconds}s`}
          </div>
        </div>
      </div>
    </Link>
  );
}

const fetcher = (url) => fetch(url, {credentials: 'include'})
    .then(async (res) => {
      const data = await res.json();
      return data?.data;
    });

export default function Profile({profile: user}) {
  const bullet = user.stats.bulletWins + user.stats.bulletDraws + user.stats.bulletDefeats;
  const blitz = user.stats.blitzWins + user.stats.blitzDraws + user.stats.blitzDefeats;
  const fast = user.stats.fastWins + user.stats.fastDraws + user.stats.fastDefeats;

  const stats = [{
    name: 'Ratio victorias',
    value: [
      Number(user.stats.bulletWins / (bullet === 0 ? 1 : bullet)),
      Number(user.stats.blitzWins / (blitz === 0 ? 1 : blitz)),
      Number(user.stats.fastWins / (fast === 0 ? 1 : fast)),
    ],
    text: ['bullet', 'blitz', 'fast'], type: 'victories',
  }, {
    name: 'Clasificación',
    value: [user.elo],
    text: [getElo(user.elo)], type: 'ranking',
  }, {
    name: 'Logros obtenidos',
    value: [user.achievements.length],
    text: ['fast'], type: 'achievements',
  }];

  const {data: games} = useSWR(user.games, fetcher);

  return (
    <>
      <ul className="flex flex-wrap justify-between gap-x-10">
        {logros.map((logro) => (
          <li
            key={logro.id}
            className="col-span-1 flex flex-col text-center"
          >
            <Achivement
              name={logro.name}
              imgSrc={logro.imagen}
              unlocked={user.achievements.includes(logro.name)}
            />
          </li>
        ))}
      </ul>
      <div>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
          {stats.map((item) => (
            <Stats
              key={item.name}
              name={item.name}
              value={item.value}
              text={item.text}
              type={item.type}
            />
          ))}
        </dl>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-y-4overflow-hidden rounded-lg md:grid-cols-3 gap-y-4 gap-x-4">
        {games?.map((item, id) => (
          <ExampleGame
            key={id}
            type={item.gameType}
            orientation={''}
            position={item.board}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            state={item.state}
          />
        ))}
      </div>
    </>
  );
}
