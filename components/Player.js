import React, {useState, useEffect} from 'react';

export default function Player({avatar, username, elo, orientation='r', turn, time }) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if(turn){
      setTimer(time);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [turn]);


  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);
  return (
    <div className="w-fit mx-auto">
      <div className='flex flex-col gap-y-6 max-w-3xl'>
        <div className='h-16 w-full flex gap-x-4'>
          <div className='flex-1 flex items-end justify-between gap-x-4'>
            <div className='flex items-center gap-x-4'>
              {orientation === 'l' &&
                <div className='flex flex-col items-end justify-evenly dark:text-white text-black'>
                  <span className='font-semibold capitalize'>
                    {username}
                  </span>
                  <span className='text-sm font-mono'>
                    {elo ? elo : 'Unranked'}
                  </span>
                </div>
              }
              <div className='relative h-16 w-16 rounded-full border-2'>
                <img
                  src={avatar ? `/assets${avatar}`: 'https://github.githubassets.com/images/mona-loading-dark.gif'}
                  className="h-full w-full object-cover rounded-full"
                  alt="avatar image"
                />
                <div className='absolute bottom-0 left-0 w-full h-full z-20 border-b-2 rounded-2xl flex items-end justify-center text-lg font-bold font-mono bg-gradient-to-t from-white/50 via-white/20 to-transparent'>
                  <span>
                  {Math.floor(timer / 60)}:{(timer % 60).toFixed(0).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              {orientation === 'r' &&
                <div className='flex flex-col items-start justify-evenly dark:text-white text-black'>
                  <span className='font-semibold capitalize'>
                    {username}
                  </span>
                  <span className='text-sm font-mono'>
                    {elo}
                  </span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
