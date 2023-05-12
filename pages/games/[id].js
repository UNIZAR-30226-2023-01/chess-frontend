import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import Player from '@/components/Player';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useChess } from '@/context/ChessContext';
import { whoami, getOrientation } from '@/lib/cmd';
import ChessPiece from 'components/ChessPiece';

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
  const {
    game, optionSquares, lastMoveSquares,
    onPieceDragBegin, onDrop, updateGame,
    onPromotion, setShowPromotion, showPromotion,
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
    <div className="px-0 sm:px-6 lg:px-8 max-h-screen h-full max-w-5xl mx-auto flex items-start py-6 lg:py-10">
      <div className='h-fit w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-y-4'>
        <div className='col-start-1 col-span-4 sm:col-start-2 sm:col-span-3 md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-4 flex  gap-x-4 md:gap-x-10 justify-center items-center'>
          <Player
            orientation='l'
            avatar={data?.lightPlayer?.avatar}
            username={getUsername('light')}
            elo={data?.lightPlayer?.elo}
          />
          <Player
            avatar={data?.darkPlayer?.avatar}
            username={getUsername('dark')}
            elo={data?.darkPlayer?.elo}
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
                        {promotionPieces.map((piece) => (
                          <div
                            key={piece.key}
                            className="inline-block"
                            onClick={() => onPromotion(piece.name)}
                          >
                            <ChessPiece
                              piece={piece.key}
                              modelo={customization?.whitePiece}
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
