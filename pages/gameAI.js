import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import { useState, useEffect} from 'react';
// import { io } from 'socket.io-client';
import { startGame } from '@/components/communications/socket_io';


export default function GameAI() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const findGame = async () => {
      try {
        await startGame('AI');
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    findGame();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Tablero colorUser={'white'}></Tablero>
      )}
    </>
  );
}


GameAI.getLayout=(page) => <Layout>{page}</Layout>;
