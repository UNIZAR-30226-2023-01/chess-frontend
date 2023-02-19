import Layout from '@/components/Layout';
import { Chessboard } from 'react-chessboard';
import React, {useState} from 'react';
import { Chess } from 'chess.js';
import _ from 'lodash';


export default function Play() {
  const [game, setGame] = useState(new Chess());
  const [isGameOver, setIsGameOver] = useState(false);
  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = _.cloneDeep(game);
    try {
      gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to a queen for example simplicity
      });
      setGame(gameCopy);
      if (gameCopy.isGameOver()) {
        setIsGameOver(true);
      }
      return true;
    } catch (error) {
      if (game.isGameOver() || game.isDraw()) {
        <div className='bg-black h-full'> </div>;
        console.log('sacabu');
      }
      return false;
    }
  }
  return (
    <div>
      <div className="w-1/2">
        { !isGameOver &&(
          <Chessboard
            id="BasicBoard"
            position={game.fen()}
            areArrowsAllowed="true"
            arePiecesDraggable="true"
            onPieceDrop={onDrop}
            animationDuration={500}
          />)
        }
        {isGameOver && (
          <div style={{ background: 'lightgray', padding: '20px' }}>
          Se ha acabado la partida
          </div>
        )}
      </div>
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
