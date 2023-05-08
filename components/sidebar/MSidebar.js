import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { primaryButton, navigation } from '@/data/navigation';
import { useChess } from '@/context/ChessContext';
import { useGame } from '@/context/GameContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Dropdown from '@/components/Dropdowns';
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

export default function MSidebar({ sidebarOpen, setSidebarOpen, user }) {
  const router = useRouter();
  const { switchModal } = useChess();
  const [options, setOptions] = useState({ roomID: ''});
  const { joinRoomAsSpectator } = useGame();
  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, fetcher);

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 border-gray-200 px-2">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex w-full max-w-xs flex-1 flex-col bg-gray-900 border-gray-200 divide-y divide-white/20">
                <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                  <nav className="space-y-2 px-2">
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
                    <Disclosure as="div" className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            onClick={() => switchModal()}
                            className='w-full cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
                          >
                            <primaryButton.icon
                              className='text-gray-200 mr-3 flex-shrink-0 h-5 w-5'
                              aria-hidden="true"
                            />
                            {primaryButton.name}
                          </Disclosure.Button>

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
                <div className="flex flex-col flex-shrink-0 border-gray-200 py-4">
                  <Dropdown
                    isLoading={isLoading}
                    id={data?.id || user.id}
                    avatar={data?.avatar}
                    username={data?.username || user.username}
                  />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
