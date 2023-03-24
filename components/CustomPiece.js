export const customPieces = (data) => ({
  wK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/rey-white.png`}
    />
  ),
  wQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/reina-white.png`}
    />
  ),
  wR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/torre-white.png`}
    />
  ),
  wB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/alfil-white.png`}
    />
  ),
  wN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/juan-white.png`}
    />
  ),
  wP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/peon-white.png`}
    />
  ),
  bK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/rey-black.png`}
    />
  ),
  bQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/reina-black.png`}
    />
  ),
  bR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/torre-black.png`}
    />
  ),
  bB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/alfil-black.png`}
    />
  ),
  bN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/juan-black.png`}
    />
  ),
  bP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/piezas/${data.model}/peon-black.png`}
    />
  ),
});

