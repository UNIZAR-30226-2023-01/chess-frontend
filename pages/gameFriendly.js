import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
// import { io } from 'socket.io-client';
import { startGame } from '@/components/communications/socket_io';

export default function GameFriendly() {
  startGame('COMP');
  return (
    <Tablero colorUser={'white'}></Tablero>
  );
}

GameFriendly.getLayout=(page) => <Layout>{page}</Layout>;
