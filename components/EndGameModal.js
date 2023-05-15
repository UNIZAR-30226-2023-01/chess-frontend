import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { TrophyIcon } from '@heroicons/react/24/outline';

export default function TournamentModal({show, setOpen, endGame, winner, player}) {
  const router = useRouter();
  const win = (winner === player)? true : false;
  return (
    <Transition.Root show={show ?? false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full  ${win ? 'bg-green-100' : 'bg-red-100'}`}>
                    <TrophyIcon className={`h-6 w-6 ${win ? 'text-green-600' : 'text-red-600'}`} aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {endGame === 'CHECKMATE' ?
                          win ?
                         'Has ganado, ¡Felicidades!' :
                         'Has perdido, ¡Sigue intentando!' :
                        endGame === 'DRAW' ?
                         'Empatados, ¡Bien Jugado!':
                          endGame === 'TIMEOUT' ?
                          win ?
                          'Has ganado por tiempo, ¡Felicidades!' :
                          'Has perdido por tiempo, ¡Sigue intentando!' :
                        'Te has rendido, no te des por vencido'
                      }
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        { endGame === 'DRAW' ?
                        'De las mejores partidas vistas en estos tiempos, a pesar del empate cualquiera podria haberse llevado la victoria' :
                        win ?
                         'Tu asombrosa habilidad cautiva a todos, impulsándolos a continuar jugando sin cesar.' :
                         'A pesar de la derrota, su espíritu resiliente inspira a levantarse y seguir luchando con renovada determinación.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push('/home');
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Volver
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
