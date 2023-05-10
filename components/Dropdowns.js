import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Theme from '@/components/Theme';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ isLoading, username, avatar, id}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full gap-x-1.5 rounded-md text-sm font-semibold shadow-sm cursor-pointer text-gray-200 hover:bg-gray-800/30 group items-center justify-between p-3">
          <span className='flex items-center gap-x-2 capitalize'>
            <img
              className="h-7 w-7 object-cover rounded-full select-none"
              src={isLoading ? '/assets/profile/animales/1.webp' : `/assets/profile${avatar}`}
              alt={avatar}
            />
            {username}
          </span>
          <EllipsisHorizontalIcon className='h-5 w-5' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="mb-14 w-full absolute right-0 bottom-0 z-10 origin-top-right divide-y divide-gray-100/20 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2 space-y-2">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                  'group flex items-center px-4 py-3 text-sm w-full',
                  )}
                >
                  <Theme active={active}/>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/faq"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                    'group flex items-center px-4 py-3 text-sm w-full',
                  )}
                >
                  <ArrowTopRightOnSquareIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Ayuda & FAQ
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-2 space-y-2">

            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/u/${id}`}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                    'group flex items-center px-4 py-3 text-sm w-full',
                  )}
                >
                  <UserIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Perfil
                  <kbd className="absolute right-0 inline-flex mr-5 items-center rounded border border-gray-200/40 px-1 font-sans text-sm text-gray-400/40">
                    ⌘ Alt+P
                  </kbd>
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-2 space-y-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick= {() => {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/sign-out`, {
                      method: 'POST',
                      credentials: 'include',
                    })
                        .then(() => window.location.href = '/auth')
                        .catch(() => {});
                  }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                    'group flex items-center px-4 py-3 text-sm w-full',
                  )}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Cerrar Sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
