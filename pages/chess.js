import Layout from '@/components/Layout';
import { Chessboard } from 'react-chessboard';

export default function Chess() {
  return (
    <div className='w-1/2'>
      <Chessboard
        id="BasicBoard"
        areArrowsAllowed="true"
        arePiecesDraggable="true"
        animationDuration={500}
      />
    </div>
  );
}

Chess.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
