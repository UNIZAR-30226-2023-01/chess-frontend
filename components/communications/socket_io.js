import { io } from 'socket.io-client';
// const { userData } = require('./profile_data.js');
// const { alertWinner } = require('./popups/winner_dialog.js');
import { game, sound } from '@/components/Tablero';


const randomChar = () => {
  const randomNumber = Math.floor(Math.random() * 26);
  return String.fromCharCode(randomNumber + 65);
};

export class GameSocket {
  constructor(token) {
    this.socket = io('http://reign-chess.duckdns.org:4001/', {
      extraHeaders: {
        'token': token,
      },
    });
    this.room = '-1';
    this.pendingMovements = [];
    this.iAmWhite = false;
    this.name = randomChar();
  }
}

export const startGame = (type, token) => {
  const s = new GameSocket(token);
  s.socket.on('connect', () => {
    console.log('Conectado al servidor');
  });
  const completer = new Promise((resolve, reject) => {
    let jsonData = {};
    switch (type) {
      case 'AI':
        jsonData = {
          gameType: 'AI',
          time: 300,
          increment: 5,
          hostColor: 'RANDOM',
          difficulty: 3,
        };
        break;
      case 'COMP':
        jsonData = { gameType: 'COMPETITIVE', time: 300 };
        break;
      default:
        jsonData = {};
        break;
    }

    s.socket.once('room', (data) => {
      s.room = data.roomID;
      // s.pendingMovements = data.moves;
      s.iAmWhite = data.color == 'LIGHT';
      resolve({
        foundRoom: true,
        roomID: data.roomID,
        isWhite: s.iAmWhite,
        socket: s,
      });
    });

    s.socket.on('error', (data) => {
    });

    s.socket.emit('find_room', jsonData);
  });

  return completer;
};

export const listenGame = (s) => {
  s.socket.on('connect', () => {});

  s.socket.on('error', (data) => {});

  s.socket.on('game_state', (data) => {});

  s.socket.on('moved', (data) => {
    if (data.turn == (!s.iAmWhite ? 'DARK' : 'LIGHT')) {
      game.move(data.move);
      sound();
    }
  });

  s.socket.on('game_over', (data) => {
    if (data.endState == 'CHECKMATE' &&
        (data.winner == (!s.iAmWhite ? 'LIGHT' : 'DARK'))) {
      // alertWinner(context, !s.iAmWhite);
    }
  });

  s.socket.on('disconnect', () => {
  });

  s.socket.on('fromServer', (_) => {
    console.log(_);
  });
};
