import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const handleGoogle = async () => {
    let timer = null;
    const popup = window.open(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/sign-in/google`, 'popup', 'width=600,height=600');
    if (popup) {
      timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          // router.push('/home');
        }
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return new Promise(function(resolve, reject) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/sign-in`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.elements?.username?.value,
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
            reject(new Error('Network response was not ok.'));
          });
    });
  };

  return (
    <div className="flex min-h-screen flex-col justify-around sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-fit h-fit mx-auto py-4">
          <img src="/assets/images/Logo_black.png" className=" h-20 mx-auto" />
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form
            onSubmit={(e) => {
              toast.promise(
                  handleSubmit(e),
                  {
                    loading: 'Comprobando credenciales...',
                    success: 'Bienvenido, te estabamos esperando .',
                    error: 'Error al inicar sesión.',
                  },
              )
                  .then(() => router.push('/home'))
                  .catch((err) => console.error(err));
            }}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-700">
                Bienvenido de nuevo
            </h2>
            <div>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  placeholder="Nombre de usuario"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
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
            </div>

            <div>
              <button
                type="submit"
                className="capitalize flex w-full justify-center rounded-sm border border-transparent bg-emerald/80 hover:bg-emerald/90 duration-300 py-4 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              >
                  continuar
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm font-base tracking-wide">
                ¿No tienes cuenta?
                <Link
                  href="/auth/signup"
                  className="ml-1 text-emerald"
                >
                 Registrate
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 select-none">O</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
              <button
                type="submit"
                data-provider="google"
                onClick={handleGoogle}
                className="flex w-full justify-start items-center gap-x-3 rounded-sm border py-4 px-5 text-sm font-medium text-gray-800 shadow-sm focus:outline-none"
              >
                <FcGoogle className='w-6 h-6'/>
                <span>Continuar con Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div/>
    </div>
  );
}
