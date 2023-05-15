import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import Player from '@/components/Player';
import jwt from 'jsonwebtoken';
import { useEffect, useState} from 'react';
import { useGame } from '@/context/GameContext';
import { useChess } from '@/context/ChessContext';
import { whoami, getOrientation } from '@/lib/cmd';
import ChessPiece from 'components/ChessPiece';
import EndGameModal from '@/components/EndGameModal';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import Badge from '@/components/Badge';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

const promotionPieces= [
  {name: 'q',
    key: 'queen',
  },
  {name: 'b',
    key: 'bishop',
  },
  {name: 'n',
    key: 'knight',
  },
  {name: 'r',
    key: 'rook',
  },
];

export default function Game({authorized, data, user}) {
  const { setInQueue, customization } = useChess();
  const [text, setText] = useState('');
  const {
    game, roomId, getInstance, sayHello, optionSquares, lastMoveSquares,
    onPieceDragBegin, onDrop, updateGame,
    onPromotion, setShowPromotion, showPromotion,
    over, turn, timer,
  } = useGame();

  useEffect(() => {
    updateGame(data.board);
    if (user.player === 'DARK' || user.player === 'LIGHT') setInQueue(false);
  }, []);

  const getUsername = (type) => {
    if (type === 'light') {
      if (data?.lightPlayer) return data?.lightPlayer?.username;
      if (data?.gameType === 'AI') return 'IA';
    } else if (type === 'dark') {
      if (data?.darkPlayer) return data?.darkPlayer?.username;
      if (data?.gameType === 'AI') return 'IA';
    }
    return 'Desconocido';
  };

  return (
    <>
      <div className="px-0 sm:px-6 lg:px-8 max-h-screen h-full max-w-5xl mx-auto flex items-start py-6 lg:py-10">
        <div className='h-fit w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-y-2'>
          <div className='col-start-1 col-span-4 sm:col-start-2 sm:col-span-3 md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-4 flex  gap-x-4 md:gap-x-10 justify-center items-center'>
            <Player
              orientation='l'
              avatar={data?.lightPlayer?.avatar}
              username={getUsername('light')}
              elo={data?.lightPlayer?.elo}
              turn={turn === 'LIGHT'}
              time ={timer[0] ?? 300}
              getInstance={getInstance}
            />
            {roomId &&
              <button
                onClick={() => {
                  copy(roomId, { debug: false, format: 'text/plain' });
                  toast.success('Room id copiado al portapapeles');
                }}
              >
                <Badge text={roomId} className={'bg-gray-200 text-gray-900'}/>
              </button>
            }
            <Player
              avatar={data?.darkPlayer?.avatar}
              username={getUsername('dark')}
              elo={data?.darkPlayer?.elo}
              turn={turn === 'DARK'}
              time ={timer[1] ?? 300}
              getInstance={getInstance}
            />
          </div>
          <div className='col-start-1 col-span-4 sm:col-start-2 sm:col-span-3 md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-4'>
            <Tablero
              orientation={getOrientation(user.player)}
              game={game}
              optionSquares={optionSquares}
              lastMoveSquares={lastMoveSquares}
              onPieceDragBegin={onPieceDragBegin}
              onDrop={onDrop}
            />
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setText(e.target.value)}
                  className="block w-full rounded-none rounded-l-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Saluda a tu rival"
                />
              </div>
              <button
                type="button"
                onClick={() => sayHello(text)}
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PaperAirplaneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
            </div>
            {showPromotion && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                    onClick={() => setShowPromotion(false)}
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                  &#8203;
                  </span>
                  <div
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                        Promocionar peón
                        </h3>
                        <div className="mt-2">
                          {promotionPieces.map((piece, id) => (
                            <div
                              key={piece.key}
                              className="inline-block cursor-pointer"
                              onClick={() => onPromotion(piece.name)}
                            >
                              <ChessPiece
                                key={id}
                                piece={piece.key}
                                modelo={getOrientation(customization?.whitePiece, customization?.blackPiece)}
                                color={getOrientation(user.player)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <audio id="pieceSound">
          <source src="/assets/audio/audio.mp3" type="audio/mp3" />
        </audio>
      </div>
      <EndGameModal show={over[0]} setOpen={()=>{}} endGame={over[1]} winner={over[2]} player={user.player}/>
    </>
  );
}


Game.getLayout=(page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { req } = context;
  const newQueryString = req.headers.cookie.replace(/;/g, '&');
  const cookies = new URLSearchParams(newQueryString);
  const token = cookies.get('api-auth');
  const decoded = jwt.decode(token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: { Cookie: req.headers.cookie },
  }).catch((err)=>console.error(err));

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/games/${id}`, {
    method: 'GET',
    headers: { Cookie: req.headers.cookie },
  }).catch((err)=>console.error(err));

  const game = await res2.json();
  const player = whoami(game.data, decoded);
  let userW = null;
  let userB = null;

  if (game?.data?.lightPlayer !== null) {
    userW = await fetch(game?.data?.lightPlayer, {
      method: 'GET',
      headers: { Cookie: req.headers.cookie },
    })
        .then((res) => res.json())
        .catch((err)=>console.error(err));
  }

  if (game?.data?.darkPlayer !== null) {
    userB = await fetch(game?.data?.darkPlayer, {
      method: 'GET',
      headers: { Cookie: req.headers.cookie },
    })
        .then((res) => res.json())
        .catch((err)=>console.error(err));
  }

  return {
    props: {
      authorized: res.ok && res.status === 200,
      data: { ...game.data, lightPlayer: userW?.data ?? null, darkPlayer: userB?.data ?? null},
      user: {
        id: decoded.id,
        username: decoded.username,
        token,
        player,
      },
    },
  };
}
