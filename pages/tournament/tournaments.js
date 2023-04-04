import Layout from '@/components/Layout';
import Table from '@/components/Table';
import Link from 'next/link';

export default function Tournaments() {
  return (
    <div className="px-0 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Torneos</h1>
          <p className="mt-2 text-sm text-left text-gray-700 dark:text-gray-200">
            Listado de todos los torneos en curso.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <Table/>
      </div>
      <div className="mt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <Link
              href="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Crea tu propio torneo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
Tournaments.getLayout = (page) => <Layout>{page}</Layout>;
