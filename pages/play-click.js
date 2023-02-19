import Layout from '@/components/Layout';
import { Chessboard } from 'react-chessboard';
import React, {useState} from 'react';
import { Chess } from 'chess.js';
import _ from 'lodash';


export default function Play() {
  const [game, setGame] = useState(new Chess());
  const [optionSquares, setOptionSquares] = useState({});
  const [moveFrom, setMoveFrom] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const movimiento = 'rgba(255, 255, 0, 0.4)';
  const newSquares = {};
  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      return;
    }

    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color ?
            'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' :
            'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
      return move;
    });

    newSquares[square] = {
      background: movimiento,
    };
    setOptionSquares(newSquares);
  }

  function onSquareClick(square) {
    function resetFirstMove(square) {
      setMoveFrom(square);
      getMoveOptions(square);
    }
    // from square
    if (!moveFrom) {
      resetFirstMove(square);
      return;
    }
    // attempt to make move
    let move = null;
    const gameCopy = _.cloneDeep(game);
    try {
      move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: 'q', // always promote to a queen for example simplicity
      });
      setGame(gameCopy);
      if (gameCopy.isGameOver()) {
        setIsGameOver(true);
      }
      newSquares[moveFrom] = {
        background: movimiento,
      };
      newSquares[square] = {
        background: movimiento,
      };
      setOptionSquares(newSquares);
    } catch (error) {
      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        // setOptionSquares({});
        resetFirstMove(square);
        return;
      }
      if (game.isGameOver() || game.isDraw()) {
        <div className='bg-black h-full'> </div>;
        console.log('sacabu');
      }
      return false;
    }
    setMoveFrom('');
  }
  return (
    <div>
      <div className="w-1/2">
        { !isGameOver &&(
          <Chessboard
            id="BasicBoard"
            position={game.fen()}
            areArrowsAllowed="true"
            arePiecesDraggable={false}
            onSquareClick={onSquareClick}
            animationDuration={200}
            customSquareStyles={{
              ...optionSquares,
            }}
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
