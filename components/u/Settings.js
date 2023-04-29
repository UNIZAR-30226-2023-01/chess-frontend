import React, { useState } from 'react';
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

export default function Settings({profile: user}) {
  const [color, setColor] = useState(['#B88B4A', '#E3C16F']);
  const [modelo, setModelo] = useState('normal');
  const { customization, saveBoard, saveColor } = useChess();

  function saveContext(colorBlack, colorWhite, model) {
    saveBoard(model);
    saveColor(colorBlack, colorWhite);
  }
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
                  <div className="col-span-4 ">
                    <label htmlFor="company-website" className="block text-sm font-medium leading-6 text-gray-900">
                      Avatar
                    </label>
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                        https://
                      </span>
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder={String(user.avatar).replace('https://', '') ?? 'api.gracehopper.xyz/assets/avatar'}
                      />
                    </div>
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
                      defaultValue={user.username ?? 'johndoe'}
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
                      defaultValue={user.email ?? 'johndoe@example.com'}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Borrar cuenta
                </button>
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
                <div className="mt-6 grid grid-cols-3 gap-6">
                  <div className='bg-gray-50/20 select-none relative col-span-1 group'>
                    <div className='absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full group-hover:bg-black/50 ease-in-out duration-300'>
                      <span className='z-20 font-semibold text-lg hidden group-hover:flex text-white duration-300 ease-in-out'>Actual</span>
                    </div>
                    <Chessboard
                      id="BasicBoard"
                      boardOrientation='white'
                      customPieces={customPieces(customization.model)}
                      arePiecesDraggable={false}
                      customDarkSquareStyle={{ backgroundColor: customization.blackPiece }}
                      customLightSquareStyle={{ backgroundColor: customization.whitePiece }}
                    />
                  </div>
                  <div className='bg-gray-50/20 select-none relative col-span-1 group'>
                    <div className='absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full group-hover:bg-black/50 ease-in-out duration-300'>
                      <span className='z-20 font-semibold text-lg hidden group-hover:flex text-white duration-300 ease-in-out'>Nuevo</span>
                    </div>
                    <Chessboard
                      id="BasicBoard"
                      boardOrientation='white'
                      customPieces={customPieces(modelo)}
                      arePiecesDraggable={false}
                      customDarkSquareStyle={{ backgroundColor: color[0] }}
                      customLightSquareStyle={{ backgroundColor: color[1] }}
                    />
                  </div>
                  <div className='flex flex-col justify-start gap-y-2'>
                    <React.Fragment key={color.id}>
                      <label htmlFor="board" className="block text-sm font-medium text-gray-700">
                        Tablero
                      </label>
                      <select
                        id="board"
                        name="board"
                        autoComplete="board"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(event) => setColor([colores[event.target.selectedIndex].color1, colores[event.target.selectedIndex].color2])}
                      >
                        {colores.map((color, index) => (
                          <option key={index}>{color.name}</option>
                        ))}
                      </select>
                    </React.Fragment>
                    <React.Fragment key={modelo.id}>
                      <label htmlFor="board" className="block text-sm font-medium text-gray-700">
                        Piezas (W)
                      </label>
                      <select
                        id="board"
                        name="board"
                        autoComplete="board"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(event) => setModelo(modelos[event.target.selectedIndex].model)}
                      >
                        {modelos.map((modelo, index) => (
                          <option key={index}>{modelo.name}</option>
                        ))}
                      </select>
                    </React.Fragment>
                    <React.Fragment key={modelo.id}>
                      <label htmlFor="board" className="block text-sm font-medium text-gray-700">
                        Piezas (B)
                      </label>
                      <select
                        id="board"
                        name="board"
                        autoComplete="board"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(event) => setModelo(modelos[event.target.selectedIndex].model)}
                      >
                        {modelos.map((modelo, index) => (
                          <option key={index}>{modelo.name}</option>
                        ))}
                      </select>
                    </React.Fragment>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  onClick = { (e) => saveContext(color[0], color[1], modelo)}
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
