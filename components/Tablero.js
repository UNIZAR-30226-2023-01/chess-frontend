import { Chessboard } from 'react-chessboard';
import React, { useState } from 'react';
import { Chess } from 'chess.js';
import _ from 'lodash';
import ChessPiece from './ChessPiece';

const promotionPieces= [
  {name: 'q',
    key: 'queen',
  },
  {name: 'b',
    key: 'bishop',
  },
  {name: 'n',
    key: 'juan',
  },
  {name: 'r',
    key: 'rook',
  },
];

export default function Tablero({ colorTablero, colorUser, modelo }) {
  const [game, setGame] = useState(new Chess());
  const [pausedgame, setPausedGame] = useState(new Chess());
  const [isGameOver, setIsGameOver] = useState(false);
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMoveSquares, setLastMoveSquares] = useState({});
  const [showPromotion, setShowPromotion] = useState(false);
  const [promotionPiece, setPromotionPiece] = useState('q');
  const movimiento = 'rgba(255, 255, 0, 0.4)';
  const newSquares = {};

  function onPieceDragBegin(piece, sourceSquare) {
    const moves = game.moves({
      square: sourceSquare,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return;
    }
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(sourceSquare).color ?
            'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' :
            'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
      return move;
    });

    newSquares[sourceSquare] = {
      background: movimiento,
    };
    setOptionSquares(newSquares);
    // setLastMoveSquares({});
  }

  function sound() {
    const audio = document.getElementById('myAudio');
    audio.play();
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = _.cloneDeep(game);
    let move = undefined;
    try {
      move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotionPiece,
      });
      if (move && move.promotion) {
        setShowPromotion(true);
        setPausedGame(gameCopy);
        return true;
      }
      setGame(gameCopy);
      if (gameCopy.isGameOver()) {
        setIsGameOver(true);
      }
      newSquares[sourceSquare] = {
        background: movimiento,
      };
      newSquares[targetSquare] = {
        background: movimiento,
      };
      setOptionSquares(newSquares);
      sound();
      setLastMoveSquares({
        [move.from]: { background: movimiento },
        [move.to]: { background: movimiento },
      });
      return true;
    } catch (error) {
      setOptionSquares({});
      if (game.isGameOver() || game.isDraw()) {
        <div className='bg-black h-full'> </div>;
        console.log('sacabu');
      }
      return false;
    }
  }

  function onPromotion(piece) {
    setPromotionPiece(piece);
    setShowPromotion(false);
    setGame(pausedgame);
  }

  return (
    <div>
      <div className='w-1/2'>
        {!isGameOver && (
          <Chessboard

            id="BasicBoard"
            position={game.fen()}
            areArrowsAllowed="true"
            arePiecesDraggable="true"
            onPieceDrop={onDrop}
            onPieceDragBegin={onPieceDragBegin}
            animationDuration={500}
            boardOrientation={colorUser}
            customSquareStyles={{
              ...optionSquares,
              ...lastMoveSquares,
            }}
            customDarkSquareStyle={{ backgroundColor: colorTablero[0] }}
            customLightSquareStyle={{ backgroundColor: colorTablero[1] }}
          />
        )}
        {isGameOver && (
          <div style={{ background: 'lightgray', padding: '20px' }}>
            Se ha acabado la partida
          </div>
        )}
      </div>
      {showPromotion && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowPromotion(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Promocionar peón
                  </h3>
                  <div className="mt-2">
                    {promotionPieces.map((piece) => (
                      <div
                        key={piece.key}
                        className="inline-block"
                        onClick={() => onPromotion(piece.name)}
                      >
                        <ChessPiece piece={piece} modelo={modelo} color={colorUser} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <audio id="myAudio">
        <source src="audio.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}
