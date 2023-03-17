export default function ChessPiece({ color, piece, modelo }) {
  const imageName = `${piece}-${color}`;
  return <img src={`/assets/piezas/${modelo}/${imageName}.png`} alt={piece} style={{ width: '60px', height: '60px' }}/>;
}
