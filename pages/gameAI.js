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
