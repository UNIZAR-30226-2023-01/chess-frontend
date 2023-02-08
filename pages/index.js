/* This example requires Tailwind CSS v3.0+ */
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/20/solid';


const tiers = [
  {
    name: 'Play Computer',
    id: 'tier-freelancer',
    href: '#',
    description: 'PLAY VS THE MACHINE',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    cta: 'Play Now',
  },
  {
    name: 'Play Online',
    id: 'tier-startup',
    href: '#',
    description: 'PLAY WITH SOMEONE AT YOUR LEVEL',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    cta: 'Play Now',
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
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Play Chess
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-prose text-center text-lg leading-8 text-gray-600">
          Join the game of chess and challenge your strategic skills. Play against opponents
          from all over the world and improve your skills, discover the thrill of playing chess now!
        </p>
        <div className="isolate mx-auto mt-16 flex flex-wrap justify-center max-w-md gap-8 lg:mx-0 lg:max-w-none">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames('ring-gray-200 rounded-xl p-6 ring-1 xl:p-6 flex flex-col' )}
            >
              <p className={classNames('text-gray-600 text-sm leading-6 text-left')}>
                {tier.description}
              </p>
              <h3
                id={tier.id}
                className={classNames('text-gray-900 text-4xl font-bold tracking-tight pb-4 border-b border-gray-200' )}
              >
                {tier.name}
              </h3>
              <ul
                role="list"
                className={classNames('text-gray-600 mt-4 mb-6 space-y-3 text-sm leading-6 xl:mt-6')}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={classNames('text-indigo-600 h-6 w-5 flex-none')}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
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
