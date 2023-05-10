import Link from 'next/link';
import { primaryButton, navigation } from '@/data/navigation';
import { useChess } from '@/context/ChessContext';
import { useGame } from '@/context/GameContext';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Dropdown from '@/components/Dropdowns';
import {useEnterKey} from '@/hooks/useKeyPress';
import Tippy from '@tippyjs/react';
import {
  BackspaceIcon,
  HandRaisedIcon,
  FlagIcon,
  PauseIcon,
} from '@heroicons/react/24/outline';

const fetcher = (url) => fetch(url, {credentials: 'include'})
    .then(async (res) => {
      const data = await res.json();
      return data?.data;
    });

export default function DSidebar({user}) {
  const router = useRouter();
  const { switchModal } = useChess();
  const [options, setOptions] = useState({ roomID: ''});
  const { joinRoomAsSpectator } = useGame();
  const Enter = useEnterKey('Enter', () => options.roomID ? joinRoomAsSpectator(options.roomID) : {});

  useEffect(() => {
    if (Enter) console.log('Enter');
  }, [Enter]);


  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, fetcher);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gray-900">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col border-gray-200 divide-y divide-white/20 px-2">
        <div className="flex flex-1 flex-col overflow-y-auto py-2">
          <nav className="flex-1 space-y-1.5">
            <form>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={(e) => setOptions({ roomID: e.target.value })}
                  placeholder='Room id ...'
                  className="block bg-transparent w-full rounded-md border-0 py-2.5 pr-14 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300/20 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    joinRoomAsSpectator(options.roomID);
                  }}
                  className="absolute inset-y-0 right-0 flex py-3 pr-1.5 cursor-pointer"
                >
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-sm text-gray-400">
                    ⌘ Enter
                  </kbd>
                </button>
              </div>
            </form>
            <button
              onClick={() => switchModal()}
              className='w-full cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
            >
              <primaryButton.icon
                className='text-gray-200 mr-3 flex-shrink-0 h-5 w-5'
                aria-hidden="true"
              />
              {primaryButton.name}
              <kbd className="absolute right-0 inline-flex mr-5 items-center rounded border border-gray-200/20 px-1 font-sans text-sm text-gray-400/20">
                ⌘ Alt+J
              </kbd>
            </button>
            {navigation.map((item, id) => (
              <Link
                key={id}
                href={item.href}
                className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
              >
                <item.icon
                  className='text-gray-200 mr-3 flex-shrink-0 h-5 w-5'
                  aria-hidden="true"
                />
                {item.name}
                {item?.key &&
                  <kbd className="absolute right-0 inline-flex mr-5 items-center rounded border border-gray-200/20 px-1 font-sans text-sm text-gray-400/20">
                    ⌘ {item.key}
                  </kbd>
                }
              </Link>
            ))}
          </nav>
        </div>
        {router.asPath.includes('game') && (
          <div className='py-3.5 flex items-center justify-between gap-x-3'>
            <Tippy
              key={'Salir'}
              placement='top'
              duration={0}
              arrow={true}
              content={
                <span className="bg-white text-gray-900 tracking-wide font-medium text-xs py-1 px-2 rounded-md">
                Salir
                </span>
              }
            >
              <button className='flex-1 p-2 border rounded-lg hover:bg-gray-50/20 duration-300'>
                <BackspaceIcon className='w-5 h-5 mx-auto text-white' />
              </button>
            </Tippy>
            <Tippy
              key={'Tablas'}
              placement='top'
              duration={0}
              arrow={true}
              content={
                <span className="bg-white text-gray-900 tracking-wide font-medium text-xs py-1 px-2 rounded-md">
                Solicitar tablas
                </span>
              }
            >
              <button className='flex-1 p-2 border rounded-lg hover:bg-gray-50/20 duration-300'>
                <FlagIcon className='w-5 h-5 mx-auto text-white' />
              </button>
            </Tippy>
            <Tippy
              key={'Solicitar pausa'}
              placement='top'
              duration={0}
              arrow={true}
              content={
                <span className="bg-white text-gray-900 tracking-wide font-medium text-xs py-1 px-2 rounded-md">
                Solicitar pausa
                </span>
              }
            >
              <button className='flex-1 p-2 border rounded-lg hover:bg-gray-50/20 duration-300'>
                <PauseIcon className='w-5 h-5 mx-auto text-white' />
              </button>
            </Tippy>
            <Tippy
              key={'Saludar'}
              placement='top'
              duration={0}
              arrow={true}
              content={
                <span className="bg-white text-gray-900 tracking-wide font-medium text-xs py-1 px-2 rounded-md">
                Saludar
                </span>
              }
            >
              <button className='flex-1 p-2 border rounded-lg hover:bg-gray-50/20 duration-300'>
                <HandRaisedIcon className='w-5 h-5 mx-auto text-white' />
              </button>
            </Tippy>
          </div>
        )}
        <div className="flex flex-col flex-shrink-0 border-gray-200 py-2">
          <Dropdown
            isLoading={isLoading}
            id={data?.id || user.id}
            avatar={data?.avatar}
            username={data?.username || user.username}
          />
        </div>
      </div>
    </div>
  );
}
