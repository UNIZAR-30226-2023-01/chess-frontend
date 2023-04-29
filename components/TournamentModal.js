import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { InputLabel } from '@/components/InputItem';
import toast from 'react-hot-toast';

export default function TournamentModal({ open, setOpen}) {
  const [options, setOptions] = useState({rounds: 0, date: 0, time: 0});

  const handleSubmit = async (e) => {
    return new Promise(function(resolve, reject) {
      try {
        const startTime = new Date(options.date + 'T' + options.time).toISOString();

        if (startTime < new Date().toISOString()) {
          reject(new Error('Invalid date or time'));
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/tournaments`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ rounds: options.rounds, startTime}),
        })
            .then((res) => {
              if (res.ok && res.status === 201) resolve('ok');
              reject(new Error('Network response was not ok.'));
            })
            .catch(() => reject(new Error('Network response was not ok.')));
      } catch (error) {
        reject(new Error('Invalid date or time'));
      }
    });
  };


  return (
    <Transition.Root show={open} as={Fragment}>
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                    <TrophyIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Torneos
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¡Desafía a los mejores y demuestra tu habilidad creando un torneo épico!
                      </p>
                    </div>
                  </div>
                </div>
                <div className='space-y-1'>
                  <InputLabel
                    id="rounds"
                    label="Rondas"
                    type="number"
                    placeholder="Numero de rondas"
                    setter={(e) => setOptions({...options, rounds: e.target.value})}
                  />
                  <InputLabel
                    id="start-date"
                    label="Fecha de inicio"
                    type="date"
                    placeholder="Fecha de inicio"
                    setter={(e) => setOptions({...options, date: e.target.value})}
                  />
                  <InputLabel
                    id="start-time"
                    label="Hora de inicio"
                    type="time"
                    placeholder="Hora de inicio"
                    setter={(e) => setOptions({...options, time: e.target.value})}
                  />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => {
                      toast.promise(
                          handleSubmit(e),
                          {
                            loading: 'Creando torneo...',
                            success: 'Torneo creada con exito',
                            error: 'Error al crear el torneo',
                          },
                      )
                          .then(() => setOpen(false))
                          .catch(() => {});
                    }}
                  >
                    Continuar
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
