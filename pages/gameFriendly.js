import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import Player from '@/components/Player';
import { startGame } from '@/components/communications/socket_io';
import jwt from 'jsonwebtoken';

export default function GameFriendly({user}) {
  startGame('COMP');
  return (
    <div className='h-screen'>
      <Player UserData={user}></Player>
      <Tablero colorUser={'white'} Socket={'gameData.socket'}></Tablero>
      <Player UserData={user}></Player>
    </div>
  );
}

GameFriendly.getLayout=(page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context) {
  const { req } = context;

  const decoded = jwt.decode(req.headers.cookie.split('=')[1]);
  const user = decoded.username;
  console.log(user);
  return { props: { user } };
}
