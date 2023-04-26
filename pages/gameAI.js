import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import { useState, useEffect} from 'react';
import { listenGame, startGame } from '@/components/communications/socket_io';

export default function GameAI({token}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isWhite, setIsWhite] = useState(null);
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
          console.log(data);
          setIsLoading(false);
          setIdRoom(data.roomID);
          console.log(idRoom);
          setIsWhite(data.isWhite);
          listenGame(data.socket);
        } catch (error) {
          console.error('Error :', error);
        }
      }
    };
    findGame();
  }, [isCalled, isMounted]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isWhite ? (
        <Tablero colorUser={'white'} Socket={gameData.socket}></Tablero>
      ) : (
        <Tablero colorUser={'black'} Socket={gameData.socket}></Tablero>
      )}
    </>
  );
}


GameAI.getLayout=(page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context) {
  const { req } = context;


  const token = req.headers.cookie?.split('=')[1];
  console.log(token);
  return { props: { token } };
}
