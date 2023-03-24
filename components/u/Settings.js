import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { Chessboard } from 'react-chessboard';
import { useChess } from '@/context/ChessContext';
import { customPieces } from '@/components/CustomPiece';

const colores = [
  {
    id: 1,
    name: 'Tablero de madera',
    color1: '#B88B4A', // maderaN
    color2: '#E3C16F', // maderaB
  },
  {
    id: 2,
    name: 'Tablero coral',
    color1: '#70A2A3', // coralN
    color2: '#B1E4B9', // coralB
  },
  {
    id: 3,
    name: 'Tablero oscuro',
    color1: '#706677', // oscuroN
    color2: '#CCB7AE', // oscuroB
  },
  {
    id: 4,
    name: 'Tablero marino',
    color1: '#6f73d2', // marN
    color2: '#9dacff', // marB
  },
  {
    id: 5,
    name: 'Tablero trigo',
    color1: '#bbbe64', // trigoN
    color2: '#eaf0ce', // trigoB
  },
  {
    id: 6,
    name: 'Tablero esmeralda',
    color1: '#6f8f72', // esmeraldaN
    color2: '#ad8d8f', // esmeraldaB
  },
];

const modelos = [
  {
    id: 1,
    name: 'Piezas chess',
    model: 'normal',
  },
  {
    id: 2,
    name: 'Piezas marroquies',
    model: 'fea',
  },
  {
    id: 3,
    name: 'Piezas maya',
    model: 'maya',
  },
  {
    id: 4,
    name: 'Piezas árabes',
    model: 'arabe',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Settings() {
  const [visibility, setvisibility] = useState(true);
  const { data, saveBoard, saveColor } = useChess();
  return (
    <div className='space-y-16'>
      {/* Profile details */}
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="payment-details-heading">
          <form action="#" method="POST">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                    Configuración del perfil
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 text-left">
                  Actualice su información personal. Tenga en cuenta que la actualización de su ubicación podría afectar a la fecha de sus partidas.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder=''
                      autoComplete="cc-given-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="cc-family-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Correo electrónico
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-1">
                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                      Cumpleaños
                    </label>
                    <input
                      type="text"
                      name="birthday"
                      id="birthday"
                      autoComplete="cc-exp"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      placeholder="MM / YY"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-1">
                    <label
                      htmlFor="invitation-code"
                      className="flex items-center text-sm font-medium text-gray-700"
                    >
                      <span>Código REIGN</span>
                      <Tippy
                        placement='top'
                        duration={0}
                        arrow={false}
                        content={
                          <span className="bg-gray-800/80 text-white tracking-tight font-medium text-xs py-1 px-2 rounded-md">
                            próximamente
                          </span>
                        }
                      >
                        <QuestionMarkCircleIcon
                          className="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      </Tippy>

                    </label>
                    <input
                      type="text"
                      name="invitation-code"
                      id="invitation-code"
                      autoComplete="invitation-code"
                      placeholder='J3PJ+7G'
                      className="cursor-not-allowed mt-1 bg-gray-200/30 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      disabled
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      País
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>
                <div className='pt-6'>
                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={visibility}
                      onChange={setvisibility}
                      className={classNames(
                            visibility ? 'bg-emerald' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                              visibility ? 'translate-x-5' : 'translate-x-0',
                              'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3">
                      <span className="text-sm font-medium text-gray-900">Perfil público</span>
                    </Switch.Label>
                  </Switch.Group>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
      {/* Profile details */}
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="payment-details-heading">
          <form action="#" method="POST">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                    Configuración del tablero
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 text-left">
                  Personaliza tu tablero de juego y tus piezas. Tenga en cuenta que la actualización sus piezas afectará a como sus rivales verán sus piezas.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div className='w-2/3 h-2/3 bg-gray-50/20 select-none relative col-span-1'>
                    <div className='absolute top-0 left-0 z-10'/>
                    <Chessboard
                      id="BasicBoard"
                      boardOrientation='white'
                      customPieces={customPieces(data)}
                      customDarkSquareStyle={{ backgroundColor: data.blackPiece }}
                      customLightSquareStyle={{ backgroundColor: data.whitePiece }}
                    />
                  </div>
                  <div className='col-span-1 flex flex-col justify-around'>

                    <div>
                      <label htmlFor="board" className="block text-sm font-medium text-gray-700">
                        Tablero
                      </label>
                      <select
                        id="board"
                        name="board"
                        autoComplete="board"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(event) => saveColor(colores[event.target.selectedIndex].color1, colores[event.target.selectedIndex].color2)}
                      >
                        {colores.map((color, index) => (
                          <option key={index}>{color.name}</option>
                        ))}
                      </select>

                    </div>

                    <div>
                      <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                      Modelo de piezas
                      </label>
                      <select
                        id="board"
                        name="board"
                        autoComplete="board"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(event) => saveBoard(modelos[event.target.selectedIndex].model)}
                      >
                        {modelos.map((modelo, index) => (
                          <option key={index}>{modelo.name}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
