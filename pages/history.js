import Layout from '@/components/Layout';
import { CheckCircleIcon, CalendarIcon, PlayIcon, EyeIcon } from '@heroicons/react/20/solid';

const applications = [
  {
    applicant: {
      name: 'Ricardo Cooper',
      email: 'ricardo.cooper@example.com',
      imageUrl:
        'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR&piece=neo&size=2',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      imageUrl:
        'https://www.chess.com/dynboard?board=green&fen=r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R&piece=neo&size=2',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR&piece=neo&size=2',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
];

export default function Example() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center ">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-left text-gray-900">History</h1>
          <p className="mt-2 text-sm text-left text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
      </div>
      <div className="mt-16 bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {applications.map((application) => (
            <li key={application.applicant.email} className='relative z-0'>
              <a href={application.href} className="block hover:bg-gray-50 overflow-hidden">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="flex-shrink-0">
                      <img className="h-24 w-2h-24" src={application.applicant.imageUrl} alt="" />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div className='flex flex-col gap-y-1'>
                        <p className="truncate text-sm text-left font-medium text-indigo-600 mb-2">{application.applicant.name} vs {application.applicant.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <p>
                          Started on <time dateTime={application.date}>{application.dateFull}</time>
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <p>
                        Ended <time dateTime={application.date}>{application.dateFull}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-4'>
                    <button
                      type="button"
                      className="group inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <PlayIcon className="h-4 w-4 text-white text-opacity-80 group-hover:text-opacity-100" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="group inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <EyeIcon className="h-4 w-4 text-white text-opacity-80 group-hover:text-opacity-100" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </a>
              <div className='absolute top-1/2 -mt-2.5 -ml-2.5 z-20'>
                <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Example.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
