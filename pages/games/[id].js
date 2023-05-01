import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import Player from '@/components/Player';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useChess } from '@/context/ChessContext';
import { whoami, getOrientation } from '@/lib/cmd';

export default function Game({authorized, data, user}) {
  const { setInQueue } = useChess();
  const {
    game, optionSquares, lastMoveSquares,
    onPieceDragBegin, onDrop, updateGame,
    setPlayer,
  } = useGame();

  useEffect(() => {
    updateGame(data.board);
    setPlayer(user.player);
    if (user.player === 'DARK' || user.player === 'LIGHT') setInQueue(false);
  }, []);

  return (
    <div className="px-0 sm:px-6 lg:px-8 max-h-screen h-full max-w-5xl mx-auto flex items-start py-6 lg:py-10">
      <div className='h-fit w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-y-4'>
        <div className='col-start-1 col-span-4 sm:col-start-2 sm:col-span-3 md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-4 flex  gap-x-4 md:gap-x-10 justify-center items-center'>
          <Player
            orientation='l'
            username={data?.lightPlayer?.username}
            elo={data?.lightPlayer?.elo}
          />
          <Player
            username={data?.darkPlayer?.username}
            elo={data?.lightPlayer?.elo}
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
  const decoded = jwt.decode(req.headers.cookie.split('=')[1]);
  const token = req.headers.cookie?.split('=')[1];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/games/${id}`, {
    method: 'GET',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  const game = await res2.json();
  const player = whoami(game.data, decoded);

  return {
    props: {
      authorized: res.ok && res.status === 200,
      data: game.data,
      user: {
        id: decoded.id,
        username: decoded.username,
        token,
        player,
      },
    },
  };
}
