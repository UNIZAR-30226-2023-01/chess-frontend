import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InputLabel, ListBox } from '@/components/InputItem';
import { useChess } from '@/context/ChessContext';
import { useGame } from '@/context/GameContext';

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
    value: 180,
  },
  {
    id: 2,
    name: 'blitz (5 min)',
    value: 300,
  },
  {
    id: 3,
    name: 'fast (10 min)',
    value: 600,
  },
];

const levels = [
  {name: 'facil', value: 0},
  {name: 'intermedio', value: 1},
  {name: 'dificil', value: 2},
  {name: 'buena suerte', value: 3},
];

const pieces = [
  {name: 'random', value: 'RANDOM'},
  {name: 'light', value: 'LIGHT'},
  {name: 'dark', value: 'DARK'},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GameModal({user}) {
  const { gameType, setGameType, selModal: open, switchModal: setOpen, setInQueue } = useChess();
  const { findRoom } = useGame();

  const [options, setOptions] = useState({ time: 300, difficulty: 1, hostColor: 'LIGHT', increment: 5});

  const setTime = (time) => setOptions((prev) => ({ ...prev, time }));
  const setLevel = (difficulty) => setOptions((prev) => ({ ...prev, difficulty }));
  const setColor = (hostColor) => setOptions((prev) => ({ ...prev, hostColor }));
  const setIncrement = (increment) => setOptions((prev) => ({ ...prev, increment }));

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
                      {tabs
                          .filter((item) => user.username !== 'guest' ? true : item.value !== 'COMPETITIVE')
                          .map((tab) => (
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
                    {(user.username !== 'guest' || gameType === 'AI') && (
                      <ListBox
                        key="Tiempo"
                        label="Tiempo"
                        items={times}
                        setter={(value) => setTime(value)}
                        defaultValue={times[1].value}
                      />
                    )}
                    {gameType === 'AI' && (
                      <ListBox
                        key="Dificultad"
                        label="Dificultad"
                        items={levels}
                        setter={(value) => setLevel(value)}
                        defaultValue={levels[1].value}
                      />
                    )}
                    {(gameType === 'AI' || gameType === 'CUSTOM') && (
                      user.username !== 'guest' || gameType === 'AI' ?
                      <>
                        <ListBox
                          key="Set piezas"
                          label="Set piezas"
                          items={pieces}
                          setter={(value) => setColor(value)}
                          defaultValue={pieces[0].value}
                        />
                        <InputLabel
                          key="Incremento"
                          id='number'
                          label='Incremento'
                          type='number'
                          placeholder='Incremento'
                          setter={(e) => setIncrement(e.target.value)}
                          defaultValue={5}
                        />
                      </> :
                      <></>
                    )}
                  </div>
                  {(user.username !== 'guest' || gameType === 'AI') &&
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          findRoom(gameType, options);
                          setOpen();
                          if (gameType === 'COMPETITIVE' | gameType === 'CUSTOM') {
                            setInQueue(true);
                          }
                        }}
                      >
                      Buscar partida
                      </button>
                    </div>
                  }
                  {gameType === 'CUSTOM' && (
                    <div className="mt-4 space-y-4">
                      {user.username !== 'guest' && (
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-400" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-600 select-none">O</span>
                          </div>
                        </div>
                      )}
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          name="search"
                          id="search"
                          onChange={(e) => setOptions({ ...options, roomID: e.target.value })}
                          placeholder='Unete a una partida'
                          className="block bg-transparent w-full rounded-md border-0 py-2.5 pr-14 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-400/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300/20 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="submit"
                          onClick={()=>{
                            console.log('PITO', gameType, options);
                            findRoom(gameType, options);
                            setOpen();
                          }}
                          className="absolute inset-y-0 right-0 flex py-3 pr-1.5 cursor-pointer"
                        >
                          <kbd className="inline-flex items-center rounded border border-gray-300 px-1 font-sans text-sm text-gray-500">
                          ⌘ Enter
                          </kbd>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
