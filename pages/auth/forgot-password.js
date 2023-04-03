import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();

    return new Promise(function(resolve, reject) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.elements?.email?.value,
        }),
      })
          .then(async (res) => {
            if (res.ok && res.status === 200) {
              const data = await res.json();
              console.log(data);
              resolve('ok');
            }
            reject(new Error('Network response was not ok.'));
          })
          .catch((error) => {
            console.log(error);
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
                    loading: 'Solicitando cambio de contraseña...',
                    success: 'Por favor, revisa tu correo',
                    error: 'Error al solicitar cambio de contraseña',
                  },
              ).catch(() => {});
            }}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-700">
                Recuperar contraseña
            </h2>
            <p className='text-sm text-center'>
            Introduce la dirección de correo que usaste en el registro. Te enviaremos un correo con tu nombre de usuario y un enlace para que puedas restablecer tu contraseña.
            </p>
            <div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
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
                  Continuar
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

        </div>
      </div>
      <div/>
    </div>
  );
}
