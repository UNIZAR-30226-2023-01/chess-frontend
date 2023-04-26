import { useTimer } from 'react-timer-hook';

export default function Tablero({UserData}) {
  const time = new Date();
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 300); // 5 minutes
  const { seconds, minutes } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div className="px-0 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className='flex flex-col gap-y-6 max-w-3xl'>
        <div className='h-16 w-full flex gap-x-4'>
          <div className='flex-1 flex items-end justify-between gap-x-4'>
            <div className='flex items-center gap-x-4'>
              <div className='h-16 w-16 rounded-2xl bg-pink-200 '>
                <img
                  src='https://images.unsplash.com/photo-1547444795-ad4270fa2885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1416&q=80'
                  className="h-full w-full object-cover rounded-2xl"
                  alt=""
                />
              </div>
              <div className='flex flex-col items-start justify-evenly dark:text-white text-black'>
                <span className='font-semibold'>
                  {UserData}
                </span>
                <span className='text-sm font-mono'>
                1000
                </span>
              </div>
            </div>
            <div className='py-1 px-2.5 dark:bg-white bg-gray-200 rounded-lg flex items-center justify-center font-medium text-2xl gap-x-1 font-mono'>
              <span>{minutes.toString().padStart(2, '0')}</span>
              <span>:</span>
              <span>{seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
