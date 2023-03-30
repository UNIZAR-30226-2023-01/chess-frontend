

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/sign-in`, {
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
        .then(async (res) => {
          if (res.ok && res.status === 200) {
            const data = await res.json();
            const { id, username, email, token } = data; // extraer los datos del usuario del cuerpo de la respuesta
            console.log('id:', id);
            console.log('correo:', email);
            console.log('username:', username);
            console.log('token:', token);
            // router.push('/home');
            return;
          }
          throw new Error('Network response was not ok.');
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
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
            onSubmit={handleSubmit}
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
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
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
