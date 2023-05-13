import React, { useState, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { useChess } from '@/context/ChessContext';
import toast, {Toaster} from 'react-hot-toast';
import { useRouter } from 'next/router';
import { customPieces } from '@/data/board';
import { mutate } from 'swr';


export default function Settings({profile: user, boards, pieces}) {
  const router = useRouter();
  const [board, setBoard] = useState(boards.find((b) => b.active).name);
  const [ptypes, setPTypes] = useState([pieces.find((b) => b.activeLight).name, pieces.find((b) => b.activeDark).name]);
  const { customization, setData } = useChess();

  const [profile, setProfile] = useState({avatar: user.avatar, username: user.username, email: user.email});

  const deleteAccount = (e) => {
    e.preventDefault();

    return new Promise(function(resolve, reject) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => {
            if (res.ok && res.status === 200) resolve('ok');
            reject(new Error('Network response was not ok.'));
          })
          .catch(() => reject(new Error('Network response was not ok.')) );
    });
  };

  const updateUser = (e) => {
    e.preventDefault();

    return new Promise(function(resolve, reject) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar: profile.avatar,
          username: profile.username,
          email: profile.email,
        }),
      })
          .then((res) => {
            if (res.ok && res.status === 200) {
              mutate(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, Object.assign({}, user, profile), false);
              resolve('ok');
            }
            reject(new Error('Network response was not ok.'));
          })
          .catch(() => reject(new Error('Network response was not ok.')));
    });
  };

  function saveContext(e) {
    e.preventDefault();

    return new Promise(function(resolve, reject) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: board,
          lightPieces: ptypes[0],
          darkPieces: ptypes[1],
        }),
      })
          .then((res) => {
            if (res.ok && res.status === 200) {
              setData(board, ptypes[0], ptypes[1]);
              resolve('ok');
            }
            reject(new Error('Network response was not ok.'));
          })
          .catch(() => reject(new Error('Network response was not ok.')));
    });
  }

  const humanAvatars = new Array(24).fill(null).map((i, id) => `/assets/humans/${id + 1}.webp`);
  const animalAvatars = new Array(50).fill(null).map((i, id) => `/assets/animals/${id + 1}.webp`);
  const memojisAvatars = new Array(28).fill(null).map((i, id) => `/assets/memojis/${id + 1}.webp`);
  const avatares = [...memojisAvatars, ...animalAvatars, ...humanAvatars];

  const sliderRef = useRef();
  let mouseDown = false;
  let startX; let scrollLeft;

  const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const stopDragging = (e) => {
    mouseDown = false;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - sliderRef.current.offsetLeft;
    const scroll = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - scroll;
  };

  return (
    <div className='space-y-16'>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Profile details */}
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="payment-details-heading">
          <div>
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
                    <ul
                      ref={sliderRef}
                      onMouseDown={startDragging}
                      onMouseUp={stopDragging}
                      onMouseLeave={stopDragging}
                      onMouseMove={handleMouseMove}
                      className="scroll-smooth mt-2 w-full mx-2 flex flex-nowrap justify-start items-center space-x-3 overflow-x-auto rounded drop-shadow-xl"
                    >
                      {avatares.map((src, i) => (
                        <li
                          key={i}
                          onClick={() => setProfile({...profile, avatar: src.replace('/assets/', '/')})}
                          className="flex flex-none flex-col items-center space-y-1 select-none cursor-pointer"
                        >
                          <div className={`bg-gradient-to-tr ${src.endsWith(profile.avatar) ? 'from-green-400 via-blue-600 to-black/80' : 'from-yellow-400 to-fuchsia-600'} p-1 rounded-full`}>
                            <div className="block bg-white p-1 rounded-full relative">
                              <img
                                src={src}
                                alt={src}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
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
                      onChange={(e) => setProfile({...profile, username: e.target.value})}
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
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      defaultValue={user.email ?? 'johndoe@example.com'}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between">
                <button
                  type="submit"
                  onClick={() => {
                    toast((t) => (
                      <div className='space-x-2'>
                        <span>Borrar cuenta</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            toast.promise(
                                deleteAccount(e),
                                {
                                  loading: 'Se están borrando tus datos...',
                                  success: 'Cuenta eliminada con exito',
                                  error: 'Error al eliminar tu cuenta',
                                },
                            )
                                .then(() => router.push('/auth/login'))
                                .catch(() => {});
                          }}
                          className="capitalize rounded bg-red-600 px-2 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Confirmar
                        </button>
                      </div>
                    ));
                  }}
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Borrar cuenta
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    toast.promise(
                        updateUser(e),
                        {
                          loading: 'Guardando los cambios...',
                          success: 'Perfil actualizado con exito',
                          error: 'Error al actualizar el perfil',
                        },
                    )
                        .then(() => mutate(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${user.id}`, null))
                        .catch(() => {});
                  }}
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Profile details */}
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="payment-details-heading">
          <form method="POST">
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
                      customPieces={customPieces(customization?.whitePiece,customization?.blackPiece)}
                      arePiecesDraggable={false}
                      customDarkSquareStyle={{ backgroundColor: boards.find((i)=> i.name === customization?.board).darkColor }}
                      customLightSquareStyle={{ backgroundColor: boards.find((i)=> i.name === customization?.board).lightColor }}
                    />
                  </div>
                  <div className='bg-gray-50/20 select-none relative col-span-1 group'>
                    <div className='absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full group-hover:bg-black/50 ease-in-out duration-300'>
                      <span className='z-20 font-semibold text-lg hidden group-hover:flex text-white duration-300 ease-in-out'>Nuevo</span>
                    </div>
                    <Chessboard
                      id="BasicBoard"
                      boardOrientation='white'
                      customPieces={customPieces(pieces.find((i) => i.name === ptypes[0]).name,pieces.find((i) => i.name === ptypes[1]).name)}
                      arePiecesDraggable={false}
                      customDarkSquareStyle={{ backgroundColor: boards.find((i)=> i.name === board).darkColor }}
                      customLightSquareStyle={{ backgroundColor: boards.find((i)=> i.name === board).lightColor }}
                    />
                  </div>
                  <div className='flex flex-col justify-start gap-y-2'>
                    <React.Fragment>
                      <label htmlFor="board" className="block text-sm font-medium text-gray-700">
                        Tablero
                      </label>
                      <select
                        id="board"
                        name="board"
                        autoComplete="board"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(e) => setBoard(e.target.value)}
                      >
                        {boards.map((piece, index) => (
                          <option key={index}>{piece.name}</option>
                        ))
                        }
                      </select>
                    </React.Fragment>
                    <React.Fragment>
                      <label htmlFor="pieces-b" className="block text-sm font-medium text-gray-700">
                        Piezas (N)
                      </label>
                      <select
                        id="pieces-b"
                        name="pieces-b"
                        autoComplete="pieces-b"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(e) => setPTypes([ptypes[0], e.target.value])}
                      >
                        {pieces.map((piece, index) => (
                          <option key={index}>{piece.name}</option>
                        ))
                        }
                      </select>
                    </React.Fragment>
                    <React.Fragment>
                      <label htmlFor="pieces-w" className="block text-sm font-medium text-gray-700">
                        Piezas (B)
                      </label>
                      <select
                        id="pieces-w"
                        name="pieces-w"
                        autoComplete="pieces-w"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        onChange={(e) => setPTypes([e.target.value, ptypes[1]])}
                      >
                        {pieces.map((piece, index) => (
                          <option key={index}>{piece.name}</option>
                        ))
                        }
                      </select>
                    </React.Fragment>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  onClick={(e) => saveContext(e)}
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
