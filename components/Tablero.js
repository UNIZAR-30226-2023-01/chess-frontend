import { Chessboard } from 'react-chessboard';
import React, {useState} from 'react';
import { Chess } from 'chess.js';
import _ from 'lodash';


export default function Tablero({colorTablero, fichas, colorUser}) {
  const [game, setGame] = useState(new Chess());
  const [isGameOver, setIsGameOver] = useState(false);
  const [optionSquares, setOptionSquares] = useState({});
  const movimiento = 'rgba(255, 255, 0, 0.4)';
  const newSquares = {};
  /* function onPieceDragBegin(piece, sourceSquare) {
    console.log(sourceSquare);
    const moves = game.moves({
      sourceSquare,
      verbose: true,
    });
    if (moves.length === 0) {
      return;
    }
    console.log(moves);
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
  }*/
  // El código anterior en teoria es para sacar la lista de movimientos de una pieza, pero te devuelve la
  // lista de todos los posibles y en play-click lo hace bien :)

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
        promotion: 'q', // always promote to a queen for example simplicity
      });
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
      console.log(move.captured);
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
            // onPieceDragBegin={onPieceDragBegin}
            animationDuration={500}
            boardOrientation={colorUser}
            customSquareStyles={{
              ...optionSquares,
            }}
            customDarkSquareStyle={{ backgroundColor: colorTablero[0] }}
            customLightSquareStyle={{ backgroundColor: colorTablero[1] }}
          />)
        }
        {isGameOver && (
          <div style={{ background: 'lightgray', padding: '20px' }}>
          Se ha acabado la partida
          </div>
        )}
      </div>
      <audio id="myAudio">
        <source src="audio.mp3" type="audio/mp3"/>
      </audio>
    </div>
  );
}
