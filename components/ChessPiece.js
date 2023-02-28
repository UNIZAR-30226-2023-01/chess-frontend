export default function ChessPiece({ color, type, modelo }) {
  const imageName = `${color}-${type}-${modelo}`;
  return <img src={`/img/pieces/${imageName}`} alt={type} />;
}
