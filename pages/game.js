import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';


export default function Game() {
  return (
    <Tablero colorUser={'white'}></Tablero>
  );
}

Game.getLayout=(page) => <Layout>{page}</Layout>;
