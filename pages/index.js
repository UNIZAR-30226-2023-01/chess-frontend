/* This example requires Tailwind CSS v3.0+ */
import {ArrowRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

const tiers = [
  {
    name: 'Play Computer',
    id: 'tier-freelancer',
    href: '#',
    description: 'PLAY VS THE MACHINE',
    cta: 'Play Now',
    Image: '/Match_Bot.png',
  },
  {
    name: 'Play Online',
    id: 'tier-startup',
    href: '#',
    description: 'PLAY WITH SOMEONE AT YOUR LEVEL',
    cta: 'Play Now',
    Image: '/Competitive_Match.png',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Play Chess
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-prose text-center text-lg leading-8 text-[#0C2131]">
          Join the game of chess and challenge your strategic skills. Play against opponents
          from all over the world and improve your skills, discover the thrill of playing chess now!
        </p>
        <div className="isolate  mx-auto mt-16 flex flex-wrap justify-center max-w-md gap-8 lg:mx-0 lg:max-w-none">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(' bg-[#C5F3FF] ring-gray-200 rounded-xl p-6 ring-1 xl:p-6 flex flex-col' )}
            >
              <p className={classNames('text-gray-600 text-sm leading-6 text-left')}>
                {tier.description}
              </p>
              <div className=" items-center justify-center">
                <Image src={tier.Image}
                  width="200"
                  height="200"
                  className="mx-auto w-2/3"
                  alt="Sample image"
                />
              </div>
              <h3
                id={tier.id}
                className={classNames('text-black text-4xl font-bold tracking-tight pb-4 border-b border-gray-200' )}
              >
                {tier.name}
              </h3>
              <ul
                role="list"
                className={classNames('text-black-600 mt-4 mb-6 space-y-3 text-sm leading-6 xl:mt-6')}
              >
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames( 'flex items-center mt-auto justify-between bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                    'rounded-md py-2 px-4 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                )}
              >
                {tier.cta}
                <ArrowRightIcon
                  className={classNames('text-white h-5 w-5 flex-none')}
                  aria-hidden="true"/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
