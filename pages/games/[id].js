// import Layout from '@/components/Layout';
// import Tablero from '@/components/Tablero';
// import jwt from 'jsonwebtoken';


import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import Player from '@/components/Player';
import { useState, useEffect} from 'react';
import { listenGame, startGame } from '@/components/communications/socket_io';
import jwt from 'jsonwebtoken';

export default function GameAI({user, token}) {
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(null);
  const [idRoom, setIdRoom] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [isCalled, setIsCalled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const findGame = async () => {
      if (isMounted && !isCalled) {
        setIsCalled(true);
        try {
          const data = await startGame('AI', token);
          setGameData(data);
          setIsLoading(false);
          setIdRoom(data.roomID);
          const aux = (data.isWhite)? 'white' : 'black';
          setColor(aux);
          listenGame(data.socket);
        } catch (error) {
          console.error('Error :', error);
        }
      }
    };
    findGame();
  }, [idRoom, isCalled, isMounted, token]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) :
      <>
        <Player UserData={'IA'}></Player>
        <Tablero colorUser={color} Socket={gameData.socket}></Tablero>
        <Player UserData={user}></Player>
      </>
      }
    </>
  );
}


GameAI.getLayout=(page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context) {
  const { req } = context;

  const decoded = jwt.decode(req.headers.cookie.split('=')[1]);
  const token = req.headers.cookie?.split('=')[1];
  const user = decoded.username;
  console.log(user);
  return {
    props: {
      user: user,
      token: token,
    },
  };
}


/* export default function Game({user, data}) {
  const lightPlayer = data.lightPlayer === user.id;
  const darkPlayer = data.lightPlayer === user.id;
  const guestPlayer = !lightPlayer && !darkPlayer;

  console.log(lightPlayer, darkPlayer, guestPlayer);

  return (
    <div>
      <Tablero colorUser={'black'}/>
    </div>
  );
}

Game.getLayout = (page) => {
  const { authorized } = page.props;
  return authorized ?
    <Layout>{page}</Layout> :
    <>{page}</>;
};

export async function getServerSideProps(context) {
  const {id} = context.params;
  const {req} = context;

  const decoded = jwt.decode(req.headers.cookie.split('=')[1]);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify`, {
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

  if (!res2.ok || res2.status !== 200) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const game = await res2.json();

  return {
    props: {
      authorized: !res.ok || res.status !== 200,
      data: game.data,
      user: {
        id: decoded.id,
        username: decoded.username,
      },
    },
  };
}*/
