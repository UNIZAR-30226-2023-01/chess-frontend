import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { BookOpenIcon, QueueListIcon, RssIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const links = [
  {
    name: 'Politica de privacidad',
    href: '/privacy',
    description: 'Descubre como tratamos tus datos.',
    icon: BookOpenIcon,
  },
  {
    name: 'Documentación de la API',
    href: 'https://unizar-30226-2023-01.github.io/chess-backend/',
    description: 'Integra un servicio con nosotros',
    icon: QueueListIcon },
  {
    name: 'Estado del servicio',
    href: 'https://status.gracehopper.xyz',
    description: 'Verifica el estado de nuestros servicios en',
    icon: RssIcon,
  }];
const social = [
  {
    name: 'GitHub',
    href: 'https://github.com/UNIZAR-30226-2023-01',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Error({ error, reset}) {
  return (
    <div className="min-h-screen flex flex-col justify-around">
      <main className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 sm:pb-24 lg:px-8">
        <img
          className="mx-auto h-2/3 w-auto sm:h-12"
          src="/assets/images/Logo_black.png"
          alt="Your Company"
        />
        <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
          <p className="text-base font-semibold leading-8 text-indigo-600">Error</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Ha ocurrido un error</h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Lo sentimos, no hemos podido encontrar la página que busca.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul role="list" className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5">
            {links.map((link, linkIdx) => (
              <li key={linkIdx} className="relative flex gap-x-6 py-6">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                  <link.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="flex-auto">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    <Link href={link.href}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {link.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{link.description}</p>
                </div>
                <div className="flex-none self-center">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link href="/" className="text-sm font-semibold leading-6 text-indigo-600">
              <span aria-hidden="true">&larr;</span>
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-100 py-6 sm:py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 sm:flex-row lg:px-8">
          <p className="text-sm leading-7 text-gray-400">&copy; {new Date().getFullYear()} Grace Hopper, Inc. All rights reserved.</p>
          <div className="hidden sm:block sm:h-7 sm:w-px sm:flex-none sm:bg-gray-200" />
          <div className="flex gap-x-4">
            {social.map((item, itemIdx) => (
              <a key={itemIdx} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
