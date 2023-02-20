import Layout from '@/components/Layout';
import React, {useState} from 'react';
import Tablero from '@/components/Tablero';


export default function Play() {
  const [board, setBoard] = useState(['#F0D9B5', '#B58863']);
  const altColor=['#edeed1', '#779952'];
  function reinicioColor() {
    setBoard(['#F0D9B5', '#B58863']);
  }
  // white #edeed1 dark #779952
  return (
    <div className='grid'>
      <Tablero colorTablero={board} fichas={'a'} colorUser={'white'}/>
      { // <Tablero colorTablero={'u.color'} fichas={'u.fichas'} colorUser={'random'}/>;
      // cuando tengamos los usuarios y tal se haría así :)
      }
      <button onClick={(e) => {
        if (board[0]=='#F0D9B5') {
          setBoard(altColor);
        } else {
          reinicioColor();
        }
      }}
      className="h-10 w-10"></button>
    </div>
  );
}

Play.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
