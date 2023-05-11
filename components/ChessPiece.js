export default function ChessPiece({ color, piece, modelo }) {
  const imageName = `${piece}-${color}`;
  return <img src={`/assets/pieces/${modelo}/${imageName}.webp`} alt={piece} style={{ width: '60px', height: '60px' }}/>;
}
