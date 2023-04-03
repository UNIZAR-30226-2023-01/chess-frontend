import { io } from 'socket.io-client';
// const { userData } = require('./profile_data.js');
// const { alertWinner } = require('./popups/winner_dialog.js');
import { Chess } from 'chess.js';
const game = new Chess();

const randomChar = () => {
  const randomNumber = Math.floor(Math.random() * 26);
  return String.fromCharCode(randomNumber + 65);
};

export class GameSocket {
  constructor() {
    this.socket = io('http://reign-chess.duckdns.org:4001/');
    this.room = '-1';
    this.iAmWhite = false;
    this.name = randomChar();
  }
}

export const startGame = (type) => {
  const s = new GameSocket();
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
    s.socket.on('error', (data) => {
      console.log('error', data);
    });

    s.socket.once('room', (data) => {
      console.log('encontrada', data);
      s.room = data.roomID;
      s.iAmWhite = data.color == 'LIGHT';
      resolve(true);
    });
    s.socket.emit('find_room', jsonData);
  });

  return completer;
};

export const listenGame = (context) => {
  const s = new GameSocket();

  s.socket.on('connect', () => {
    console.log('connected');
  });

  s.socket.on('error', (data) => {
    console.log(data);
  });

  s.socket.on('game_state', (data) => {
    console.log(data);
  });

  s.on('moved', (data) => {
    if (data[0]['turn'] == (!s.iAmWhite ? 'DARK' : 'LIGHT')) {
      game.move(data[0]['move']);
    }
    console.log(data);
  });

  s.socket.on('game_over', (data) => {
    if (data[0]['endState'] == 'CHECKMATE' &&
        (data[0]['winner'] == (!s.iAmWhite ? 'LIGHT' : 'DARK'))) {
      // alertWinner(context, !s.iAmWhite);
    }
    console.log(data);
  });

  s.on('disconnect', () => {
    console.log('disconnected');
  });

  s.socket.on('fromServer', (_) => {
    console.log(_);
  });
};
