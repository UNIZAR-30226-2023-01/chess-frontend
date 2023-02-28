import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Theme from '@/components/Theme';
import { Disclosure } from '@headlessui/react';
import { primaryButton, navigation, subNavigation } from '@/data/navigation';
import { CubeIcon } from '@heroicons/react/24/outline';


export default function MSidebar({ sidebarOpen, setSidebarOpen }) {
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
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <nav className="space-y-2 px-2">
                  <Link href="/" className="w-full h-fit">
                    <img src="/vercel_light.svg" className="w-24 h-16 mx-auto" />
                  </Link>
                  <Disclosure as="div" className="space-y-1">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='cursor-pointer mb-2 w-full text-gray-200 hover:bg-gray-500/10 transition-colors duration-200 group flex items-center px-3 py-3 text-sm font-medium rounded-md border border-white/20'>
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
                              as="a"
                              href={subItem.href}
                              className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
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
              <div className="flex flex-col flex-shrink-0 border-gray-200 py-4 border-t border-white/20">
                <nav className="space-y-2 px-2">
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
                            href={item.href}
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
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
