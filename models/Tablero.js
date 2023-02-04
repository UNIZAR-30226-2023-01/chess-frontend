import react from "react";
import Casilla from "./Casilla.js";
import Pieza from './Pieza.js';

const Vert=[1,2,3,4,5,6,7,8] //Eje horizontal
const Horz=["a","b","c","d","e","f","g","h"]//Eje horizontal


const vectorPiezas = [];

for (let i = 0;i<8;i++){
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: "./Chess_plt60.png", x: i, y: 1 }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: "./Chess_pdt60.png", x: i, y: 6 }));
}

for (let c = 0;c<2;c++){
    const color = (c == 0) ? "l" : "d";//primer barrido piezas blancas, segundo barrido piezas negras
    const y = (c == 0) ? 0 : 7;//primer barrido piezas de fila 0, segundo barrido fila 7
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_r${color}t60.png`, x: 0, y }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_n${color}t60.png`, x: 1, y }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_b${color}t60.png`, x: 2, y }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_r${color}t60.png`, x: 7, y }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_n${color}t60.png`, x: 6, y }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_b${color}t60.png`, x: 5, y }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_q${color}t60.png`, x: 3, y }));
    vectorPiezas.push(Object.assign({}, Pieza, {
        image: `./Chess_k${color}t60.png`, x: 4, y }));

        

}




export default function Tablero() {
  let board = [];
  for (let i = Vert.length - 1; i >= 0; i--) {
    for (let j = 0; j < Horz.length; j++) {
      let image = undefined;
      vectorPiezas.forEach(element => {
        if (element.x === j && element.y === i) {
          image = element.image;
        }
      });

      board.push(<Casilla key = {`${i},${j}`} posicion={i + j + 2} imagen={image} />);
    }
  }

    return <div id="tablero">{board}</div>
}