import React from 'react';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { Chessboard } from 'react-chessboard';

export default function Game({children}) {
  const [timeElapsed, setTimeElapsed] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const startTime = new Date(children.createdAt).getTime();
      const elapsedTime = currentTime - startTime;
      setTimeElapsed({
        hours: Math.floor(elapsedTime / 3600000),
        minutes: Math.floor((elapsedTime % 3600000) / 60000),
        seconds: Math.floor((elapsedTime % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [children.createdAt]);


  return (
    <Link href={`/games/${children.id}`}>
      <div className="flex flex-col items-center">
        <div className='w-36 h-36 bg-gray-50/20 select-none relative'>
          <div className='w-36 h-36 absolute top-0 left-0 z-10'/>
          <Chessboard
            id="BasicBoard"
            position={children.board}
            boardOrientation='white'
          />
        </div>
        <div className="p-5 text-center">
          <p className="text-lg font-medium text-gray-800 hover:underline dark:text-white">
            LightPlayer / DarkPlayer
          </p>
          <time className="text-sm text-gray-500 dark:text-gray-300">
            {`${timeElapsed.hours}:${timeElapsed.minutes < 10 ? `0${timeElapsed.minutes}` : timeElapsed.minutes}:${timeElapsed.seconds < 10 ? `0${timeElapsed.seconds}` : timeElapsed.seconds}`}
          </time>
        </div>
      </div>
    </Link>
  );
}
