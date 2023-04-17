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

