import Layout from '@/components/Layout';
import { Chessboard } from 'react-chessboard';
import { useTimer } from 'react-timer-hook';
import { Chess } from 'chess.js';
import _ from 'lodash';
import { useState } from 'react';

export default function Game() {
  const time = new Date();
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 300); // 5 minutes
  const { seconds, minutes } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const [game, setGame] = useState(new Chess());
  const [optionSquares, setOptionSquares] = useState({});
  const [moveFrom, setMoveFrom] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  console.log(isGameOver);

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
        setOptionSquares({});
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
              boardOrientation='white'
              areArrowsAllowed="true"
              arePiecesDraggable={false}
              onSquareClick={onSquareClick}
              animationDuration={200}
              customSquareStyles={{
                ...optionSquares,
              }}
            />
          </div>
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
