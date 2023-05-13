export const customPieces = (white, black) => ({

  wK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${white}/king-w.webp`}
      alt="White King"
    />
  ),
  wQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${white}/queen-w.webp`}
      alt="White Queen"
    />
  ),
  wR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${white}/rook-w.webp`}
      alt="White Rook"
    />
  ),
  wB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${white}/bishop-w.webp`}
      alt="White Bishop"
    />
  ),
  wN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${white}/knight-w.webp`}
      alt="White Knight"
    />
  ),
  wP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${white}/pawn-w.webp`}
      alt="White Pawn"
    />
  ),
  bK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${black ?? white}/king-b.webp`}
      alt="Black King"
    />
  ),
  bQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${black ?? white}/queen-b.webp`}
      alt="Black Queen"
    />
  ),
  bR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${black ?? white}/rook-b.webp`}
      alt="Black Rook"
    />
  ),
  bB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${black ?? white}/bishop-b.webp`}
      alt="Black Bishop"
    />
  ),
  bN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${black ?? white}/knight-b.webp`}
      alt="Black Knight"
    />
  ),
  bP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${black ?? white}/pawn-b.webp`}
      alt="Black Pawn"
    />
  ),
});
