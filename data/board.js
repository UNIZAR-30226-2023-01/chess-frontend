export const customPieces = (data) => ({
  wK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/king-w.webp`}
      alt="White King"
    />
  ),
  wQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/queen-w.webp`}
      alt="White Queen"
    />
  ),
  wR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/rook-w.webp`}
      alt="White Rook"
    />
  ),
  wB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/bishop-w.webp`}
      alt="White Bishop"
    />
  ),
  wN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/knight-w.webp`}
      alt="White Knight"
    />
  ),
  wP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/pawn-w.webp`}
      alt="White Pawn"
    />
  ),
  bK: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/king-b.webp`}
      alt="Black King"
    />
  ),
  bQ: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/queen-b.webp`}
      alt="Black Queen"
    />
  ),
  bR: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/rook-b.webp`}
      alt="Black Rook"
    />
  ),
  bB: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/bishop-b.webp`}
      alt="Black Bishop"
    />
  ),
  bN: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/knight-b.webp`}
      alt="Black Knight"
    />
  ),
  bP: ({ squareWidth }) => (
    <img
      style={{ width: squareWidth, height: squareWidth }}
      src= {`/assets/pieces/${data}/pawn-b.webp`}
      alt="Black Pawn"
    />
  ),
});
