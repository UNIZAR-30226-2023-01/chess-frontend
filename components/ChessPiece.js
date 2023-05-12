export default function ChessPiece({ color, piece, modelo }) {
  const colors = (color == 'white') ? 'w' : 'b';
  const imageName = `${piece}-${colors}`;
  return <img src={`/assets/pieces/${modelo}/${imageName}.webp`} alt={piece} style={{ width: '60px', height: '60px' }}/>;
}
