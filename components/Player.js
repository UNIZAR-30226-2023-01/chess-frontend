import { useTimer } from 'react-timer-hook';

export default function Player({avatar, username, elo, orientation='r'}) {
  const time = new Date();
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 300); // 5 minutes
  const { seconds, minutes } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div className="w-fit mx-auto">
      <div className='flex flex-col gap-y-6 max-w-3xl'>
        <div className='h-16 w-full flex gap-x-4'>
          <div className='flex-1 flex items-end justify-between gap-x-4'>
            <div className='flex items-center gap-x-4'>
              {orientation === 'l' &&
                <div className='flex flex-col items-end justify-evenly dark:text-white text-black'>
                  <span className='font-semibold'>
                    {username}
                  </span>
                  <span className='text-sm font-mono'>
                    {elo}
                  </span>
                </div>
              }
              <div className='relative h-16 w-16 rounded-2xl border-2'>
                <img
                  src={avatar}
                  className="h-full w-full object-cover rounded-2xl"
                  alt="avatar image"
                />
                <div className='absolute bottom-0 left-0 w-full h-full z-20 border-b-2 rounded-2xl flex items-end justify-center text-lg font-bold font-mono bg-gradient-to-t from-white/50 via-white/20 to-transparent'>
                  <span>
                    {minutes.toString().padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span>
                    {seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              {orientation === 'r' &&
                <div className='flex flex-col items-start justify-evenly dark:text-white text-black'>
                  <span className='font-semibold'>
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

Player.defaultProps = {
  avatar: 'https://i.pravatar.cc/300',
  username: 'Username',
  elo: 1200,
};
