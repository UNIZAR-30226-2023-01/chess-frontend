import { Chessboard } from 'react-chessboard';
import { useChess } from '@/context/ChessContext';
import { customPieces } from '@/data/board';

export default function Tablero({
  orientation,
  game,
  optionSquares,
  lastMoveSquares,
  onPieceDragBegin,
  onDrop,
}) {
  const { customization } = useChess();

  return (
    <div className='w-full bg-white/20'>
      <Chessboard
        id="BasicBoard"
        position={game.fen()}
        areArrowsAllowed="true"
        arePiecesDraggable="true"
        onPieceDrop={onDrop}
        onPieceDragBegin={onPieceDragBegin}
        animationDuration={400}
        boardOrientation={orientation}
        customPieces={customPieces(customization?.whitePiece?.value)}
        customSquareStyles={{
          ...optionSquares,
          ...lastMoveSquares,
        }}
        customDarkSquareStyle={{ backgroundColor: customization.board.black }}
        customLightSquareStyle={{ backgroundColor: customization.board.white }}
      />
    </div>
  );
}
