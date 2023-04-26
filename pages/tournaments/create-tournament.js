import Layout from '@/components/Layout';


export default function CreateTournament() {
  return (
    <div className="flex min-h-screen flex-col justify-around sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form
            className="space-y-6"
            action="#"
            method="POST"
          >
            <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Crear un nuevo torneo</h1>
            <p className="mt-2 text-sm text-left text-gray-700 dark:text-gray-200">
             Crea un nuevo torneo con el nombre,fecha de fin y número de participantes que quieras.
            </p>
            <div>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  placeholder="Nombre del torneo"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                />
              </div>
              <div className="mt-2">
                <input
                  id="participantes"
                  name="participantes"
                  type="participantes"
                  autoComplete="participantes"
                  placeholder="Participantes"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                />
              </div>
              <div className="mt-2">
                <input
                  name="end-date"
                  id="end-date"
                  autoComplete="cc-exp"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  placeholder="MM / YY"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="capitalize flex w-full justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                  continuar
              </button>
            </div>

          </form>
        </div>
      </div>
      <div/>
    </div>
  );
}

CreateTournament.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  if (!res.ok || res.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { },
  };
}
