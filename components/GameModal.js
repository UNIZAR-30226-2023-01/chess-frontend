import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InputLabel, ListBox } from '@/components/InputItem';
import { useChess } from '@/context/ChessContext';
import { useGame } from '@/context/GameContext';
import toast from 'react-hot-toast';

const tabs = [
  {
    name: 'IA',
    value: 'AI',
  }, {
    name: 'Competitiva',
    value: 'COMPETITIVE',
  }, {
    name: 'Amistosa',
    value: 'CUSTOM',
  },
];

const times = [
  {
    id: 1,
    name: 'bullet (3 min)',
    value: 3,
  },
  {
    id: 2,
    name: 'blitz (5 min)',
    value: 5,
  },
  {
    id: 3,
    name: 'fast (10 min)',
    value: 10,
  },
];

const levels = [
  {name: 'facil', value: 1},
  {name: 'intermedio', value: 2},
  {name: 'dificil', value: 3},
  {name: 'buena suerte', value: 4},
];

const pieces = [
  {name: 'random', value: 'RANDOM'},
  {name: 'light', value: 'LIGHT'},
  {name: 'dark', value: 'DARK'},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GameModal() {
  const { gameType, setGameType, selModal: open, switchModal: setOpen } = useChess();
  const { findRoom } = useGame();

  const [options, setOptions] = useState({ time: 300, difficulty: 1, hostColor: 'LIGHT', increment: 5});

  const setTime = (time) => setOptions((prev) => ({ ...prev, time }));
  const setLevel = (difficulty) => setOptions((prev) => ({ ...prev, difficulty }));
  const setColor = (hostColor) => setOptions((prev) => ({ ...prev, hostColor }));
  const setIncrement = (increment) => setOptions((prev) => ({ ...prev, increment }));

  const handleSubmit = () => {
    return new Promise(function(resolve, reject) {
      findRoom(gameType, options);
      resolve('ok');
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
          <div className="flex flex-col min-h-full justify-center items-start p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative min-h-[36rem] transform overflow-hidden transition-all sm:my-4 sm:w-full sm:max-w-sm">
                <div className='sm:w-full sm:max-w-sm'>
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      defaultValue={gameType}
                    >
                      {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden sm:block w-full">
                    <nav className="w-full flex space-x-4" aria-label="Tabs">
                      {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          onClick={() => setGameType(tab.value)}
                          className={classNames(
                        tab.value === gameType ? 'text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                        'rounded-md px-3 py-2.5 text-sm font-medium bg-white shadow-lg flex-1 mb-3',
                          )}
                          aria-current={tab.value === gameType ? 'page' : undefined}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className='bg-white rounded-lg px-4 pb-4 pt-5 text-left shadow-xl sm:p-6'>
                  <div className='flex flex-col space-y-1'>
                    <ListBox
                      label="Tiempo"
                      items={times}
                      setter={(value) => setTime(value)}
                    />
                    {gameType === 'AI' && (
                      <ListBox
                        label="Dificultad"
                        items={levels}
                        setter={(value) => setLevel(value)}
                      />
                    )}
                    {(gameType === 'AI' || gameType === 'CUSTOM') && (
                      <>
                        <ListBox
                          label="Set piezas"
                          items={pieces}
                          setter={(value) => setColor(value)}
                        />
                        <InputLabel
                          id='number'
                          label='Incremento'
                          type='number'
                          placeholder='Incremento'
                          setter={(e) => setIncrement(e.target.value)}
                        />
                      </>
                    )}
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e) => {
                        toast.promise(
                            handleSubmit(e),
                            {
                              loading: 'Buscando partida...',
                              success: 'Entrando a la partida',
                              error: 'Error al buscar partida',
                            },
                        )
                            .then(() => setOpen())
                            .catch(() => {});
                      }}
                    >
                      Buscar partida
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
