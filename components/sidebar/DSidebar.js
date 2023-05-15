import Link from 'next/link';
import { primaryButton, navigation } from '@/data/navigation';
import { useChess } from '@/context/ChessContext';
import { useGame } from '@/context/GameContext';
import { useState} from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Dropdown from '@/components/Dropdowns';
import {useEnterKey} from '@/hooks/useKeyPress';
import GameButton from '@/components/GameButton';
import {
  BackspaceIcon,
  FlagIcon,
  PauseIcon,
  HandRaisedIcon,
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
  const { gameType, joinRoomAsSpectator, surrender, voteDraw, voteSave, sayHello } = useGame();
  useEnterKey('Enter', () => options.roomID ? joinRoomAsSpectator(options.roomID) : {});

  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, fetcher);

  const iaButtons = [
    {
      text: 'rendirse',
      onClick: () => surrender(),
      icon: BackspaceIcon,
    }, {
      text: 'guardar',
      onClick: () => voteSave(),
      icon: PauseIcon,
    },
  ];

  const competitiveButtons = [
    {
      text: 'rendirse',
      onClick: () => surrender(),
      icon: BackspaceIcon,
    }, {
      text: 'tablas',
      onClick: () => voteDraw(),
      icon: FlagIcon,
    }, {
      text: 'saludar',
      onClick: () => sayHello(),
      icon: HandRaisedIcon,
    },
  ];

  const customButtons = [
    {
      text: 'rendirse',
      onClick: () => surrender(),
      icon: BackspaceIcon,
    }, {
      text: 'tablas',
      onClick: () => voteDraw(),
      icon: FlagIcon,
    }, {
      text: 'guardar',
      onClick: () => voteSave(),
      icon: PauseIcon,
    }, {
      text: 'saludar',
      onClick: () => sayHello(),
      icon: HandRaisedIcon,
    },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gray-900">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col border-gray-200 divide-y divide-white/20 px-2">
        <div className="flex flex-1 flex-col overflow-y-auto py-2">
          <nav className="flex-1 space-y-1.5">
            <form autoComplete='off'>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={(e) => setOptions({ roomID: e.target.value })}
                  placeholder='Visualizar partida'
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
            {navigation
                .filter((item) => user.username !== 'guest' ? true : item.name === 'Jugar partida')
                .map((item, id) => (
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
            <div className='w-full flex flex-col justify-center gap-y-1.5 py-4 items-center text-gray-200/30'>
              <span className='text-sm font-semibold select-none'>
                Volver al lobby
              </span>
              <kbd className="w-fit flex items-center font-semibold rounded border border-gray-200/20 px-1 font-sans text-sm text-gray-400/20">
                ⌘ Alt+H
              </kbd>
            </div>
          </nav>
        </div>
        {router.asPath.includes('game') && gameType && (
          <div className='py-3.5 flex items-center justify-between gap-x-3'>
            {gameType === 'AI' && (
              iaButtons.map((item, id) => (
                <GameButton
                  key={id}
                  onClick={() => item.onClick()}
                  text={item.text}
                  Icon={item.icon}
                />
              ))
            )}
            {gameType === 'COMPETITIVE' && (
              competitiveButtons.map((item, id) => (
                <GameButton
                  key={id}
                  onClick={() => item.onClick()}
                  text={item.text}
                  Icon={item.icon}
                />
              ))
            )}
            {gameType === 'CUSTOM' && (
              customButtons.map((item, id) => (
                <GameButton
                  key={id}
                  onClick={() => item.onClick()}
                  text={item.text}
                  Icon={item.icon}
                />
              ))
            )}
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
