import { Chessboard } from 'react-chessboard';
import { useChess } from '@/context/ChessContext';
import { customPieces } from '@/data/board';

export default function Tablero({
  skins,
  orientation,
  game,
  optionSquares,
  lastMoveSquares,
  onPieceDragBegin,
  onDrop,
}) {
  const { customization } = useChess();

  return (
    <div className='w-full bg-white/20 relative h-full'>
      <Chessboard
        id="BasicBoard"
        position={game.fen()}
        areArrowsAllowed="true"
        arePiecesDraggable="true"
        onPieceDrop={onDrop}
        onPieceDragBegin={onPieceDragBegin}
        animationDuration={400}
        boardOrientation={orientation}
        customPieces={customPieces(customization?.whitePiece, customization?.blackPiece)}
        customSquareStyles={{
          ...optionSquares,
          ...lastMoveSquares,
        }}
        customDarkSquareStyle={{ backgroundColor: skins.find((i) => i.name === customization.board).darkColor }}
        customLightSquareStyle={{ backgroundColor: skins.find((i) => i.name === customization.board).lightColor }}
      />
    </div>
  );
}
