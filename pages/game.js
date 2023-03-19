import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';


export default function Game() {
  return (
    <Tablero colorTablero={['#6f73d2', '#9dacff']} colorUser='white' modelo='normal'></Tablero>
  );
}

Game.getLayout=(page) => <Layout>{page}</Layout>;
