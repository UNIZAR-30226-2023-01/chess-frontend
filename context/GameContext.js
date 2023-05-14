import React, {useState, useContext, useEffect} from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { Chess } from 'chess.js';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

const GameContext = React.createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({token, authorized, children}) {
  const router = useRouter();
  const [socket, setSocket] = useState(null);

  const [gameType, setGameType] = useState();
  const [game, setGame] = useState(new Chess());
  const [pausedgame, setPausedGame] = useState({});
  const [showPromotion, setShowPromotion] = useState(false);
  const [optionSquares, setOptionSquares] = useState({});
  const [lastMoveSquares, setLastMoveSquares] = useState({});
  const [over, setOver] = useState([false]);
  const [turn, setTurn] = useState();
  const [timer, setTimer] = useState([300,300]);

  const cMov = 'rgba(255, 255, 0, 0.4)';

  const [player, setPlayer] = useState();

  const updateGame = (fen) => {
    if (fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
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

    const handleConnectError = (err) => {
      console.log(err.message);
    };

    const handleConnect = () => {
      console.log('connected');
    };

    const handleDisconnect = () => {
      console.log('disconnected');
    };

    const handleReconnect = () => {
      console.log('reconnected');
    };

    const handleRoomCreated = (message) => {
      console.log('room_created message', message);
      setGameType(message.gameType);

      toast((t) => (
        <span className='flex items-center gap-x-2 whitespace-nowrap'>
          Partida con ID: <span className='bg-gray-100 text-gray-900 px-2 py-1 rounded-md text-sm uppercase font-semibold'>{message.roomID}</span> creada.
          <button
            onClick={() => {
              copy(message.roomID, { debug: false, format: 'text/plain' });
              toast.dismiss(t.id);
            }}
            className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Compartir
          </button>
        </span>
      ), {
        duration: 1000 * 60,
      });
    };

    const handleRoom = (message) => {
      console.log('room message', message);
      setPlayer(message.color);
      setGameType(message.gameType);
      setTurn(message.turn);
      setTimer([message.timerLight/1000, message.timerDark/1000]);
      router.push(`/games/${message.roomID}`);
    };

    const handleCancelled = (message) => {
      console.log('canceled message', message);
    };

    const handleMoved = (message) => {
      console.log('moved message', message);
      setTimer([message.timerLight/1000, message.timerDark/1000]);
      setTurn(message.turn);
      if (!player) return;
      if (message.turn === player) {
        moved(message.move);
      }
    };

    const handleGameOver = (message) => {
      console.log('game_over message', message);
      const resul = ['CHECKMATE', 'TIMEOUT', 'DRAW', 'SURRENDER'].includes(message.endState);
      setGame(new Chess());
      setOver([resul, message.endState, message.winner]);
    };
    const handleVotedDraw = (message) => {
      console.log('voted_draw message', message);
      toast((t) => (
        <span className='flex items-center gap-x-2 whitespace-nowrap'>
          Tu rival pide tablas.
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Aceptar
          </button>
        </span>
      ), {
        duration: 1000 * 60,
      });
    };

    const handleVotedSave = (message) => {
      console.log('voted_save message', message);
    };


    const handleError = (message) => {
      console.log('error message', message);
      if (message.error === 'ALREADY_PLAYING') toast('Ya estas actualmente en una partida o en una cola para jugar.', {icon: '🥸'});
      if (message.error === 'NOT_PLAYING_ANY_GAME')toast('No estas conectado a ninguna partida actualmente.', {icon: '🐦'});
    };

    socket.on('connect_error', handleConnectError);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('reconnect', handleReconnect);
    socket.on('room_created', handleRoomCreated);
    socket.on('room', handleRoom);
    socket.on('cancelled', handleCancelled);
    socket.on('moved', handleMoved);
    socket.on('game_over', handleGameOver);
    socket.on('voted_draw', handleVotedDraw);
    socket.on('voted_save', handleVotedSave);
    socket.on('error', handleError);

    return () => {
      socket.off('connect_error', handleConnectError);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('reconnect', handleReconnect);
      socket.off('room_created', handleRoomCreated);
      socket.off('room', handleRoom);
      socket.off('cancelled', handleCancelled);
      socket.off('moved', handleMoved);
      socket.off('game_over', handleGameOver);
      socket.off('voted_draw', handleVotedDraw);
      socket.off('voted_save', handleVotedSave);
      socket.off('error', handleError);
    };
  }, [socket, player, game]);

  const resumeMatch = (roomID) => {
    console.log('Retomando partida : ', roomID);
    socket.emit('resume', {gameID: roomID});
  };


  const findRoom = (gameType, options={}) => {
    setOver(false);
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
      message = options?.roomID ? {gameType: 'CUSTOM', roomID: options.roomID} : {};
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
    toast('Te has rendido', { icon: '🐥' });
  };

  const voteDraw = (mov) => {
    socket.emit('vote_draw');
    toast('Has pedido tablas', {
      icon: '♟️',
    });
  };

  const voteSave = (mov) => {
    socket.emit('vote_save');
    if (gameType === 'AI') toast('Has guardado la partida.', { icon: '🤖' });
    else toast('Has pedido guardar la partida.', { icon: '👥' });
  };

  function onPieceDragBegin(piece, sourceSquare) {
    console.log(game);
    // Obtenemos los posibles movimientos de la pieza
    let who;
    if (authorized === 'LIGHT') who = 'w';
    else if (authorized === 'DARK') who ='b';

    if (who !== piece[0]) {
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
    let who;
    if (authorized==='LIGHT') who = 'w';
    else if (authorized==='DARK') who ='b';

    if (who !== piece[0]) return;

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
      console.log("onDrop ",game);
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
      console.log('su move',game);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <GameContext.Provider value={{
      gameType,
      setGameType,
      resumeMatch,
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
      over,
      turn,
      timer,
    }}>
      {children}
    </GameContext.Provider>
  );
}
