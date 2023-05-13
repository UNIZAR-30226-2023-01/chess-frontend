import React, {useState, useContext, useEffect} from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { Chess } from 'chess.js';
import _ from 'lodash';
import toast from 'react-hot-toast';

const GameContext = React.createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({token, authorized, children}) {
  const router = useRouter();
  const [socket, setSocket] = useState(null);

  const [game, setGame] = useState(new Chess());
  const [pausedgame, setPausedGame] = useState({});
  const [showPromotion, setShowPromotion] = useState(false);
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMoveSquares, setLastMoveSquares] = useState({});
  const cMov = 'rgba(255, 255, 0, 0.4)';

  const [player, setPlayer] = useState();

  const updateGame = (fen) => {// 'rnb2bnr/p1P1kppp/8/4P3/4P3/8/PP4PP/RNB1KBNR b KQ - 0 12'
    if (fen !== 'rnbqkbnr/pppppppp/8/8/8/8/8/RNBQKBNR w KQkq - 0 1') {
      setGame(new Chess(fen));
    }
  };

  useEffect(() => {
    if (!socket) {
      const socket = io(process.env.NEXT_PUBLIC_WS_URL, {
        reconnectionDelayMax: 10000,
        extraHeaders: {
          token: token,
        },
      });

      setSocket(socket);
      console.log('socket created', socket);
    }
  }, [token]);

  useEffect(() => {
    if (!socket) return;

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

    // You found a room
    socket.on('room_created', (message) => {
      console.log('room_created message', message);
    });

    // You found a room
    socket.on('room', (message) => {
      console.log('room message', message);
      setPlayer(message.color);
      router.push(`/games/${message.roomID}`);
    });

    // You canceled the search
    socket.on('cancelled', (message) => {
      console.log('canceled message', message);
    });

    // Someone moved a piece
    socket.on('moved', (message) => {
      console.log('moved message', message);
      if (!player) return;
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
  }, [socket, player, game]);

  const findRoom = (gameType, options={}) => {
    console.log('findRoom', gameType, options);
    const gameTypesAllowed = ['AI', 'COMPETITIVE', 'CUSTOM', 'JOINCUSTOM'];
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
    } else if (gameType === 'JOINCUSTOM') {
      message = options?.roomID ?
      {gameType: 'CUSTOM', roomID: options.roomID}:
      {

      };
      socket.emit('join_room', message);
      return;
    }
    console.log(message);
    socket.emit('find_room', message);
  };

  const cancelSearch = () => {
    socket.emit('cancel');
  };

  const joinRoomAsPlayer = (roomID) => {
    socket.emit('find_room', {gameType: 'CUSTOM', roomID});
  };

  const joinMatchAsPlayer = (matchID) => {
    socket.emit('find_room', {gameType: 'TOURNAMENT', matchID});
  };

  const joinRoomAsSpectator = (roomID) => {
    socket.emit('join_room', {roomID});
  };

  const movePiece = (mov) => {
    socket.emit('move', {'move': mov});
  };

  const surrender = (mov) => {
    socket.emit('surrender');
    toast('Un titan nunca se rinde!!', {
      icon: '👺',
    });
  };

  const voteDraw = (mov) => {
    socket.emit('vote_draw');
    toast('Has pedido tablas', {
      icon: '♟️',
    });
  };

  const voteSave = (mov) => {
    socket.emit('vote_save');
    toast('Has pedido pausar el juego', {
      icon: '🧃',
    });
  };

  function onPieceDragBegin(piece, sourceSquare) {
    // Obtenemos los posibles movimientos de la pieza
    let turn;
    if (authorized === 'LIGHT') turn = 'w';
    else if (authorized === 'DARK') turn ='b';

    if (turn !== piece[0]) {
      toast('Quieto viejo suelta esa pieza', { icon: '👺' });
      return;
    }
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

  function onDrop(sourceSquare, targetSquare, piece) {
    let turn;
    if (authorized==='LIGHT') turn = 'w';
    else if (authorized==='DARK') turn ='b';

    if (turn !== piece[0]) return;

    try {
      const gameCopy = _.cloneDeep(game);
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // ponemos reina pero luego se modifica
      });

      if (move && move.promotion) {
        console.log('QUIERO PROMOCIONAR');
        setShowPromotion(true);
        setPausedGame({sourceSquare, targetSquare}); // Lo utilizaremos para la promotion
        return true;
      }

      setGame(gameCopy);
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

  function onPromotion(piece) { // Cuando se quiera promocionar movemos el juego origen
    setShowPromotion(false);
    const move = game.move({
      from: pausedgame.sourceSquare,
      to: pausedgame.targetSquare,
      promotion: piece,
    });
    movePiece(move.lan);
    setLastMoveSquares({});
  }

  function moved(m) {
    try {
      const move = game.move(m);
      setOptionSquares({
        [move.from]: { background: cMov },
        [move.to]: { background: cMov },
      });

      setLastMoveSquares({
        [move.from]: { background: cMov },
        [move.to]: { background: cMov },
      });
      setGame(game);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <GameContext.Provider value={{
      findRoom,
      cancelSearch,
      joinRoomAsPlayer,
      joinRoomAsSpectator,
      joinMatchAsPlayer,
      game,
      optionSquares,
      lastMoveSquares,
      onPieceDragBegin,
      onDrop,
      updateGame,
      onPromotion,
      setShowPromotion,
      showPromotion,
      surrender,
      voteDraw,
      voteSave,
    }}>
      {children}
    </GameContext.Provider>
  );
}
