import Link from 'next/link';
import Theme from '@/components/Theme';
import { Disclosure } from '@headlessui/react';
import { primaryButton, navigation, subNavigation } from '@/data/navigation';
import { CubeIcon } from '@heroicons/react/24/outline';
import { useChess } from '@/context/ChessContext';
import { useGame } from '@/context/GameContext';
import { useState } from 'react';

export default function DSidebar({userId}) {
  const {setGameType, switchModal} = useChess();
  const [options, setOptions] = useState({ roomID: ''});
  const { findRoom } = useGame();

  const joinGame = () => {
    return new Promise(function(resolve, reject) {
      findRoom('CUSTOM', options);
      resolve('ok');
    });
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gray-900">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col border-gray-200 divide-y divide-white/20 px-2">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 space-y-1.5">
            <Link href="/" className="w-full h-fit">
              <img src="/assets/images/Logo_white.png" className=" h-16 mx-auto" />
            </Link>
            <form>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={(e) => setOptions({ ...options, roomID: e.target.value })}
                  placeholder='Room id ...'
                  className="block bg-transparent w-full rounded-md border-0 py-2.5 pr-14 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300/20 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  onClick={joinGame}
                  className="absolute inset-y-0 right-0 flex py-3 pr-1.5 cursor-pointer"
                >
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-sm text-gray-400">
                    ⌘ Enter
                  </kbd>
                </button>
              </div>
            </form>
            <Disclosure as="div" className="space-y-1">
              {({ open }) => (
                <>
                  <Disclosure.Button className='cursor-pointer mb-2 w-full text-gray-200 hover:bg-gray-500/10 transition-colors duration-200 group flex items-center px-3 py-3 text-sm font-medium rounded-md ring-1 ring-inset ring-gray-300/20'>
                    <primaryButton.icon
                      className='text-gray-200 mr-3 flex-shrink-0 h-5 w-5'
                      aria-hidden="true"
                    />
                    {primaryButton.name}
                  </Disclosure.Button>
                  <Disclosure.Panel className="space-y-1">
                    {primaryButton.link.map((subItem) => (
                      <Disclosure.Button
                        key={subItem.name}
                        className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group w-full flex items-center px-3 py-3 text-sm font-medium rounded-md'
                        onClick={() => {
                          setGameType(subItem.state);
                          switchModal();
                        }}
                      >
                        <CubeIcon
                          className='opacity-0 mr-3 flex-shrink-0 h-5 w-5'
                          aria-hidden="true"
                        />
                        {subItem.name}
                      </Disclosure.Button>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
              >
                <item.icon
                  className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col flex-shrink-0 border-gray-200 py-4">
          <nav className="space-y-1">
            {subNavigation.map((item) => (
              <>
                {item.theme ? (
                  <Theme/>
                ) : item.onClick ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className='cursor-pointer w-full text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
                  >
                    <item.icon
                      className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href.replace(':id', userId)}
                    className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
                  >
                    <item.icon
                      className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )}
              </>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
