import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ResetPassword({ id, token}) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.elements?.password?.value !== e.target.elements?.confirmPassword?.value) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    return new Promise(function(resolve, reject) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: e.target.elements?.password?.value,
        }),
      })
          .then((res) => {
            if (res.ok && res.status === 200) {
              resolve('ok');
            }
            reject(new Error('Network response was not ok.'));
          })
          .catch(() => {
            throw new Error('Network response was not ok.');
          });
    });
  };

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
            onSubmit={(e) => {
              toast.promise(
                  handleSubmit(e),
                  {
                    loading: 'Cambiando la contraseña...',
                    success: 'Contraseña cambiada con exito',
                    error: 'Error al cambiar la contraseña',
                  },
              ).then(() => {
                router.push('/home');
              }).catch(() => {});
            }}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-700">
                Recuperar contraseña
            </h2>
            <p className='text-sm text-center'>
             Su nueva contraseña debe ser segura y diferente a la anterior.
            </p>
            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  placeholder="Contraseña"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirmPassword"
                  placeholder="Confirmar nueva contraseña"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="capitalize flex w-full justify-center rounded-sm border border-transparent bg-emerald/80 hover:bg-emerald/90 duration-300 py-4 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              >
                  Enviar
              </button>
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/reset-password/${id}/${token}`)
      .catch(()=> {});

  if (!res.ok || res.status !== 200) {
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
