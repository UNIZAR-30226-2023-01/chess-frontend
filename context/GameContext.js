import React, {useState, useContext, useEffect} from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { Chess } from 'chess.js';
import _ from 'lodash';

const GameContext = React.createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({token, children}) {
  const router = useRouter();
  const [socket, setSocket] = useState(null);

  const [game, setGame] = useState(new Chess());
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMoveSquares, setLastMoveSquares] = useState({});
  const cMov = 'rgba(255, 255, 0, 0.4)';

  const [player] = useState('LIGHT');

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL, {
      reconnectionDelayMax: 10000,
      extraHeaders: {
        token: token,
      },
    });

    setSocket(socket);

    socket.on('connect_error', (err) => {
      console.log(err.message);
    });

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('reconnect', () => {
      console.log('reconnected');
    });
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    // You found a room
    socket.on('room_created', (message) => {
      console.log('room_created message', message);
    });

    // You found a room
    socket.on('room', (message) => {
      console.log('room message', message);
      router.push(`/games/${message.roomID}`);
    });

    // You canceled the search
    socket.on('canceled', (message) => {
      console.log('canceled message', message);
    });

    // Someone moved a piece
    socket.on('moved', (message) => {
      console.log('moved message', message);
      if (message.turn === player) {
        moved(message.move);
      }
    });

    // Game ended
    socket.on('game_over', (message) => {
      console.log('game_over message', message);
    });

    // Someone requested a draw
    socket.on('voted_draw', (message) => {
      console.log('voted_draw message', message);
    });

    // Someone requested a pause
    socket.on('voted_save', (message) => {
      console.log('voted_save message', message);
    });

    // An error occurred
    socket.on('error', (message) => {
      console.log('error message', message);
    });
  }, [socket, game]);

  const findRoom = (gameType, options={}) => {
    const gameTypesAllowed = ['AI', 'COMPETITIVE', 'CUSTOM'];
    if (!gameTypesAllowed.includes(gameType)) {
      throw new Error('Invalid game type');
    }

    let message = {};

    if (gameType === 'AI') {
      message = {
        gameType,
        time: options?.time ?? 300,
        increment: options?.increment ?? 5,
        hostColor: options?.hostColor ?? 'LIGHT',
        difficulty: options?.difficulty ?? 1,
      };
    } else if (gameType === 'COMPETITIVE') {
      message = {
        gameType,
        time: options?.time ?? 300,
      };
    } else if (gameType === 'CUSTOM') {
      message = options?.roomID ?
      {gameType, roomID: options.roomID} :
      {
        gameType,
        time: options?.time ?? 300,
        increment: options?.increment ?? 5,
        hostColor: options?.hostColor ?? 'LIGHT',
      };
    }

    socket.emit('find_room', message);
  };

  const movePiece = (mov) => {
    console.log('move', {'move': mov});
    socket.emit('move', {'move': mov});
  };

  function onPieceDragBegin(piece, sourceSquare) {
    // Obtenemos los posibles movimientos de la pieza
    const posibleMoves = game.moves({
      square: sourceSquare,
      verbose: true,
    });

    // Si no puedo moverme, no hago nada
    if (posibleMoves.length === 0) {
      setOptionSquares({});
      return;
    }

    // Pintamos los posibles movimientos
    const newSquares = posibleMoves.reduce((acc, move) => {
      const isDifferentColor = game.get(move.to) && game.get(move.to).color !== game.get(sourceSquare).color;
      acc[move.to] = {
        background: `radial-gradient(circle, rgba(0,0,0,.1) ${isDifferentColor ? '85%' : '25%'}, transparent ${isDifferentColor ? '85%' : '25%'})`,
        borderRadius: '50%',
      };
      return acc;
    }, {});

    // Pintamos el origen
    newSquares[sourceSquare] = { background: cMov };

    setOptionSquares(newSquares);
    setLastMoveSquares({});
  }

  function onDrop(sourceSquare, targetSquare) {
    try {
      const gameCopy = _.cloneDeep(game);
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
      });

      if (move && move.promotion) {
        // Si es un movimiento de promoción, preguntamos que pieza queremos
        return true;
      }

      console.log('game', gameCopy);
      setGame(gameCopy);
      console.log('game', game);
      movePiece(move.lan);

      setOptionSquares({
        sourceSquare: { background: cMov },
        targetSquare: { background: cMov },
      });

      setLastMoveSquares({
        [move.from]: { background: cMov },
        [move.to]: { background: cMov },
      });

      return true;
    } catch (error) {
      setOptionSquares({});
      return false;
    }
  }

  function moved(m) {
    console.log('game', game);
    console.log('game turno', game.turn());
    console.log('move gg', m);
    try {
      const gameCopy = _.cloneDeep(game);
      const move = gameCopy.move(m);
      setGame(gameCopy);
      console.log('game pp', game);

      setOptionSquares({
        [move.from]: { background: cMov },
        [move.to]: { background: cMov },
      });

      setLastMoveSquares({
        [move.from]: { background: cMov },
        [move.to]: { background: cMov },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <GameContext.Provider value={{
      findRoom,
      game,
      optionSquares,
      lastMoveSquares,
      onPieceDragBegin,
      onDrop,
    }}>
      {children}
    </GameContext.Provider>
  );
}
