import Link from 'next/link';

export default function ResetPassword({ id, token}) {
  return (
    <div className="flex min-h-screen flex-col justify-around sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href='/' className="w-fit h-fit mx-auto py-4">
          <img
            src="/assets/images/Logo_black.png"
            alt=""
            className="h-20 mx-auto"
          />
        </Link>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form
            className="space-y-6"
            action="#"
            method="POST"
          >
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-700">
              Cuenta verificada
            </h2>
            <p className='text-sm text-center'>
             Su cuenta ha sido verificada con éxito, ya puede iniciar sesión.
            </p>
            <div>
              <Link
                href='/auth/signin'
                className="capitalize flex w-full justify-center rounded-sm border border-transparent bg-emerald/80 hover:bg-emerald/90 duration-300 py-4 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              >
                Continuar
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id, token } = context.params;

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify/${id}/${token}`)
      .catch(()=> {});

  if (!res2.ok || res2.status !== 200) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      id,
      token,
    },
  };
}
