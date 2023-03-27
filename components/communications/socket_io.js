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

export const startGame = (context, type) => {
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

    s.socket.emit('find_room', jsonData);

    s.socket.once('room', (data) => {
      s.room = data[0]['roomID'];
      s.iAmWhite = data[0]['color'] == 'LIGHT';
      game.move(data[0]['move']);
      resolve();
    });

    s.socket.on('game_state', (data) => {
      console.log('a');
    });

    s.socket.on('moved', (data) => {
      if (data[0]['turn'] == (!s.iAmWhite ? 'DARK' : 'LIGHT')) {
        game.move(data[0]['move']);
      }
    });

    s.socket.on('game_over', (data) => {
      if (
        data[0]['endState'] == 'CHECKMATE' &&
        data[0]['winner'] == (!s.iAmWhite ? 'LIGHT' : 'DARK')
      ) {
        // alertWinner(context, !s.iAmWhite);
      }
    });

    s.socket.on('disconnect', (_) => {});
    s.socket.on('fromServer', (_) => {});
  });

  return completer;
};

export const listenGame = (context) => {
  const s = new GameSocket();

  s.on('connect', () => {
    console.log('connected');
  });

  s.on('error', (data) => {
    console.log(data);
  });

  s.on('game_state', (data) => {
    console.log(data);
  });

  s.on('moved', (data) => {
    if (data[0]['turn'] == (!s.iAmWhite ? 'DARK' : 'LIGHT')) {
      game.move(data[0]['move']);
    }
    console.log(data);
  });

  s.on('game_over', (data) => {
    if (data[0]['endState'] == 'CHECKMATE' &&
        (data[0]['winner'] == (!s.iAmWhite ? 'LIGHT' : 'DARK'))) {
      // alertWinner(context, !s.iAmWhite);
    }
    console.log(data);
  });

  s.on('disconnect', () => {
    console.log('disconnected');
  });

  s.on('fromServer', (_) => {
    console.log(_);
  });
};
