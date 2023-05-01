export const boardTypes = [
  {
    id: 1,
    name: 'Tablero de madera',
    value: 'wood',
    black: '#B88B4A', // maderaN
    white: '#E3C16F', // maderaB
  },
  {
    id: 2,
    name: 'Tablero coral',
    value: 'coral',
    black: '#70A2A3', // coralN
    white: '#B1E4B9', // coralB
  },
  {
    id: 3,
    name: 'Tablero oscuro',
    value: 'dark',
    black: '#706677', // oscuroN
    white: '#CCB7AE', // oscuroB
  },
  {
    id: 4,
    name: 'Tablero marino',
    value: 'marine',
    black: '#6f73d2', // marN
    white: '#9dacff', // marB
  },
  {
    id: 5,
    name: 'Tablero trigo',
    value: 'wheat',
    black: '#bbbe64', // trigoN
    white: '#eaf0ce', // trigoB
  },
  {
    id: 6,
    name: 'Tablero esmeralda',
    value: 'emerald',
    black: '#6f8f72', // esmeraldaN
    white: '#ad8d8f', // esmeraldaB
  },
];

export const pieceTypes = [
  {
    id: 1,
    name: 'Piezas chess',
    value: 'chess',
  },
  {
    id: 2,
    name: 'Piezas marroquies',
    value: 'moroccans',
  },
  {
    id: 3,
    name: 'Piezas maya',
    value: 'maya',
  },
  {
    id: 4,
    name: 'Piezas árabes',
    value: 'arab',
  },
];

export const customPieces = (data) => ({
  wK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/rey-white.png`}
    />
  ),
  wQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/reina-white.png`}
    />
  ),
  wR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/torre-white.png`}
    />
  ),
  wB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/alfil-white.png`}
    />
  ),
  wN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/juan-white.png`}
    />
  ),
  wP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/peon-white.png`}
    />
  ),
  bK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/rey-black.png`}
    />
  ),
  bQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/reina-black.png`}
    />
  ),
  bR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/torre-black.png`}
    />
  ),
  bB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/alfil-black.png`}
    />
  ),
  bN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/juan-black.png`}
    />
  ),
  bP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data}/peon-black.png`}
    />
  ),
});
