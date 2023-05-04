import Link from 'next/link';
import Achivement from '@/components/Achivement';
import { Chessboard } from 'react-chessboard';


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
              {value[0]}
              <span className="ml-1 text-xs font-medium text-gray-500 capitalize">{text[0]}</span>
            </div>
            /
            <div className="flex items-baseline text-xl font-semibold text-indigo-600">
              {value[1]}
              <span className="ml-1 text-xs font-medium text-gray-500 capitalize">{text[1]}</span>
            </div>
            /
            <div className="flex items-baseline text-xl font-semibold text-indigo-600">
              {value[2]}
              <span className="ml-1 text-xs font-medium text-gray-500 capitalize">{text[2]}</span>
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

export function Game({
  key,
  type,
  orientation,
  position,
  date,
  state,
  duration,
}) {
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
  );
}

export default function Profile({profile: user}) {
  const stats = [
    { name: 'Partidas ganadas', value: [user.stats.bulletWins, user.stats.blitzWins, user.stats.fastWins], text: ['bullet', 'blitz', 'fast'], type: 'victories' },
    { name: 'Clasificación', value: [1200], text: ['GM'], type: 'ranking' },
    { name: 'Logros obtenidos', value: [user.achievements.length], text: ['fast'], type: 'achievements' },
  ];
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
        {[1, 2, 3].map((item) => (
          <Game
            key={item}
            type=''
            orientation=''
            position=''
            date=''
            state=''
            duration=''
          />
        ))}
      </div>
    </>
  );
}
