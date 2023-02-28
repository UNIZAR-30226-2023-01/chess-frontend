export default function Reconnect() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
        <p className="text-sm leading-6 text-gray-900">
        ¡Atención! Hemos detectado una perdida de conexión con el servidor de la partida en la que estás participando.
        Para evitar perder la partida o sufrir alguna penalización, te informamos que tienes un tiempo determinado para reconectarte.
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <button
            type="button"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm duration-200 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Reconectar
          </button>
          <button type="button" className="rounded-md hover:bg-red-600 px-3 py-2 text-sm font-semibold duration-200 text-black hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
            Abandonar
          </button>
        </div>
      </div>
    </div>
  );
}
