export default function ChessPiece({ color, type, modelo }) {
  const imageName = `${type}-${color}`;
  return <img src={`/piezas/${modelo}/${imageName}`} alt={type} />;
}
