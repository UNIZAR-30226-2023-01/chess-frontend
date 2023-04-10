import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import _ from 'lodash';
import { useState } from 'react';
import ChessPiece from 'components/ChessPiece';
import { useChess } from '@/context/ChessContext';
import { customPieces } from '@/components/CustomPiece';

const promotionPieces= [
  {name: 'q',
    key: 'reina',
  },
  {name: 'b',
    key: 'alfil',
  },
  {name: 'n',
    key: 'juan',
  },
  {name: 'r',
    key: 'torre',
  },
];

export let game = new Chess();

export function sound() {
  const audio = document.getElementById('myAudio');
  audio.play();
}
export default function Tablero({colorUser, Socket}) {
  let movement = '';
  const [pausedgame, setPausedGame] = useState({});
  // const [isGameOver, setIsGameOver] = useState(false);
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMoveSquares, setLastMoveSquares] = useState({});
  const [showPromotion, setShowPromotion] = useState(false);
  const cMov = 'rgba(255, 255, 0, 0.4)';
  const newSquares = {};
  const { data } = useChess();

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
      background: cMov,
    };
    setOptionSquares(newSquares);
    // setLastMoveSquares({});
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = _.cloneDeep(game);
    let move = undefined;
    try {
      move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // ponemos reina pero luego se modifica
      });
      if (move && move.promotion) {
        setShowPromotion(true);
        setPausedGame({sourceSquare, targetSquare}); // Lo utilizaremos para la promotion
        return true;
      }
      movement = {move: move.san};
      Socket.socket.emit('move', movement);
      game = (gameCopy);
      if (gameCopy.isGameOver()) {
        // setIsGameOver(true);
      }
      newSquares[sourceSquare] = {
        background: cMov,
      };
      newSquares[targetSquare] = {
        background: cMov,
      };
      setOptionSquares(newSquares);
      sound();
      setLastMoveSquares({
        [move.from]: { background: cMov },
        [move.to]: { background: cMov },
      });
      return true;
    } catch (error) {
      setOptionSquares({});
      if (game.isGameOver() || game.isDraw()) {
        <div className='bg-black h-full'> </div>;
      }
      return false;
    }
  }

  function onPromotion(piece) { // Cuando se quiera promocionar movemos el juego origen
    setShowPromotion(false);
    const moves = game.move({
      from: pausedgame.sourceSquare,
      to: pausedgame.targetSquare,
      promotion: piece,
    });
    movement = {move: moves.san};
    Socket.socket.emit('move', movement);
    setLastMoveSquares({});
  }

  return (
    <div className="px-0 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className='flex flex-col gap-y-6 max-w-3xl'>
        {/* Board */}
        <div className='flex-1 w-full flex'>
          <div className='flex-1 bg-white/20'>
            <Chessboard
              id="BasicBoard"
              position={game.fen()}
              areArrowsAllowed="true"
              arePiecesDraggable="true"
              onPieceDrop={onDrop}
              onPieceDragBegin={onPieceDragBegin}
              animationDuration={400}
              boardOrientation={colorUser}
              customPieces={customPieces(data)}
              customSquareStyles={{
                ...optionSquares,
                ...lastMoveSquares,
              }}
              customDarkSquareStyle={{ backgroundColor: data.blackPiece }}
              customLightSquareStyle={{ backgroundColor: data.whitePiece }}
            />
            {/* isGameOver && (
              <div style={{ background: 'lightgray', padding: '20px' }}>
                Se ha acabado la partida
              </div>
            )*/}
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
                            <ChessPiece
                              piece={piece.key}
                              modelo={data.model}
                              color={colorUser}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <audio id="myAudio">
        <source src="/assets/audio/audio.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}
