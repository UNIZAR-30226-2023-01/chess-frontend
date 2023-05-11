import React from 'react';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { Chessboard } from 'react-chessboard';
import useSWR from 'swr';

const fetcher = (url) => fetch(url, {credentials: 'include'}).then((res) => res.json());

export default function Game({game}) {
  const { data: userW } = useSWR(game?.lightPlayer ? game?.lightPlayer : null, fetcher, { revalidateIfStale: false });
  const { data: userB } = useSWR(game?.darkPlayer ? game?.darkPlayer : null, fetcher, { revalidateIfStale: false });
  
  const getUsername = (type) => {
    if (type === 'light') {
      if (game?.lightPlayer) return userW?.data?.username;
      if (game?.gameType === 'AI') return 'IA';
    } else if (type === 'dark') {
      if (game?.darkPlayer) return userB?.data?.username;
      if (game?.gameType === 'AI') return 'IA';
    }
    return 'Desconocido';
  };

  const [timeElapsed, setTimeElapsed] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const startTime = new Date(game.createdAt).getTime();
      const elapsedTime = currentTime - startTime;
      setTimeElapsed({
        hours: Math.floor(elapsedTime / 3600000),
        minutes: Math.floor((elapsedTime % 3600000) / 60000),
        seconds: Math.floor((elapsedTime % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [game.createdAt]);

  return (
    <Link href={`/games/${game.id}`}>
      <div className="flex flex-col items-center">
        <div className='w-36 h-36 bg-gray-50/20 select-none relative'>
          <div className='w-36 h-36 absolute top-0 left-0 z-10'/>
          <Chessboard
            id="BasicBoard"
            position={game.board}
            boardOrientation='white'
          />
        </div>
        <div className="p-5 text-center">
          <p className="text-lg font-medium text-gray-800 hover:underline dark:text-white capitalize">
            {getUsername('light')} / {getUsername('dark')}
          </p>
          <time className="text-sm text-gray-500 dark:text-gray-300">
            {`${timeElapsed.hours}:${timeElapsed.minutes < 10 ? `0${timeElapsed.minutes}` : timeElapsed.minutes}:${timeElapsed.seconds < 10 ? `0${timeElapsed.seconds}` : timeElapsed.seconds}`}
          </time>
        </div>
      </div>
    </Link>
  );
}
