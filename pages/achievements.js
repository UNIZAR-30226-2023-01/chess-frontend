import Layout from '@/components/Layout';
import Achivement from '@/components/Achivement';
const logros = [
  {
    id: 1,
    name: 'Logro 1',
    imagen: '/assets/achievements/1.png',
  },
  {
    id: 2,
    name: 'Logro 2',
    imagen: '/assets/achievements/2.png',
  },
  {
    id: 3,
    name: 'Logro 3',
    imagen: '/assets/achievements/3.png',
  },
  {
    id: 5,
    name: 'Logro 4',
    imagen: '/assets/achievements/4.png',
  },
  {
    id: 6,
    name: 'Logro 4',
    imagen: '/assets/achievements/5.png',
  },
  {
    id: 7,
    name: 'Logro 4',
    imagen: '/assets/achievements/6.png',
  },
  {
    id: 8,
    name: 'Logro 4',
    imagen: '/assets/achievements/7.png',
  },

];

export default function Achive() {
  return (
    <div className="py-12 max-w-5xl mx-auto px-0 sm:px-6 lg:px-8">
      <div className='flex items-center justify-between gap-x-4'>
        <div className="sm:flex sm:items-center">
          <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Logros</h1>
        </div>
      </div>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {logros.map((logro) => (
          <li
            key={logro.id}
            className="col-span-1 flex flex-col text-center"
          >
            <Achivement
              imageUrl={logro.imagen}
              name={logro.name}
              id={logro.id}
              unlocked={logro.id % 2 === 0}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

Achive.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
