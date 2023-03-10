import Layout from '@/components/Layout';
import { Chessboard } from 'react-chessboard';
import { useTimer } from 'react-timer-hook';
import { Chess } from 'chess.js';
import _ from 'lodash';
import { useState } from 'react';
import ChessPiece from 'components/ChessPiece';

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
    key: 'rey',
  },
];

export default function Game({ colorTablero, colorUser, modelo }) {
  const time = new Date();
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 300); // 5 minutes
  const { seconds, minutes } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called') });

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
    console.log(isGameOver);
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
    <div className="px-0 sm:px-6 lg:px-8 py-12 max-h-full h-full max-w-5xl mx-auto">
      <div className='h-full flex flex-col gap-y-6 max-w-3xl'>
        {/* Player 1 */}
        <div className='h-16 w-full flex gap-x-4'>
          <div className='w-8'/>
          <div className='flex-1 flex items-end justify-between gap-x-4'>
            <div className='flex items-center gap-x-4'>
              <div className='h-16 w-16 rounded-2xl bg-pink-200 '>
                <img
                  src='https://images.unsplash.com/photo-1547444795-ad4270fa2885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1416&q=80'
                  className="h-full w-full object-cover rounded-2xl"
                  alt=""
                />
              </div>
              <div className='flex flex-col items-start justify-evenly dark:text-white text-black'>
                <span className='font-semibold'>
                Hector Toral
                </span>
                <span className='text-sm font-mono'>
                1000
                </span>
              </div>
            </div>
            <div className='py-1 px-2.5 dark:bg-white bg-gray-200 rounded-lg flex items-center justify-center font-medium text-2xl gap-x-1 font-mono'>
              <span>{minutes.toString().padStart(2, '0')}</span>
              <span>:</span>
              <span>{seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        {/* Board */}
        <div className='flex-1 w-full flex gap-x-4'>
          <div className='w-8 shadow-lg'>
            <div className='bg-black h-1/2 w-full rounded-t'/>
            <div className='bg-white h-1/2 w-full rounded-b'/>
          </div>
          <div className='flex-1 bg-white/20'>
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
                        Promocionar pe??n
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
        </div>
        {/* Player 2 */}
        <div className='h-16 w-full flex gap-x-4'>
          <div className='w-8'/>
          <div className='flex-1 flex items-start justify-between gap-x-4'>
            <div className='flex items-center gap-x-4'>
              <div className='h-16 w-16 rounded-2xl bg-pink-200 '>
                <img
                  src='https://images.unsplash.com/photo-1547444795-ad4270fa2885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1416&q=80'
                  className="h-full w-full object-cover rounded-2xl"
                  alt=""
                />
              </div>
              <div className='flex flex-col items-start justify-evenly dark:text-white text-black'>
                <span className='font-semibold'>
                Hector Toral
                </span>
                <span className='text-sm font-mono'>
                1000
                </span>
              </div>
            </div>
            <div className='py-1 px-2.5 dark:bg-white bg-gray-200 rounded-lg flex items-center justify-center font-medium text-2xl gap-x-1 font-mono'>
              <span>{minutes.toString().padStart(2, '0')}</span>
              <span>:</span>
              <span>{seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Game.getLayout=(page) => <Layout>{page}</Layout>;
