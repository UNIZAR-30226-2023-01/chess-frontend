import React, { useState, useRef } from 'react';
import Casilla from './Casilla.js';
import Pieza from './Pieza.js';

const Vert=[1, 2, 3, 4, 5, 6, 7, 8]; // Eje horizontal
const Horz=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];// Eje horizontal


const tableroIni = [];

for (let i = 0; i<8; i++) {
  const Wpawn = new Pieza(i, 1, './Chess_plt60.png', 'white', 'Pawn');
  const Bpawn = new Pieza(i, 6, './Chess_pdt60.png', 'black', 'Pawn');
  tableroIni.push(Wpawn);
  tableroIni.push(Bpawn);
}

for (let c = 0; c<2; c++) {
  const color = (c == 0) ? 'l' : 'd';// primer check piezas blancas,
  // segundo negras
  const ncolor = (c==0) ? 'white' : 'black';
  const y = (c == 0) ? 0 : 7;// primer barrido piezas de fila 0,
  // segundo barrido fila 7
  const torre = new Pieza(0, y, `./Chess_r${color}t60.png`, ncolor, 'rook');
  const knight = new Pieza(1, y, `./Chess_n${color}t60.png`, ncolor, 'knight');
  const queen = new Pieza(3, y, `./Chess_q${color}t60.png`, ncolor, 'queen');
  const king = new Pieza(4, y, `./Chess_k${color}t60.png`, ncolor, 'king');
  const bishop = new Pieza(2, y, `./Chess_b${color}t60.png`, ncolor, 'bishop');
  const _bishop = new Pieza(5, y, `./Chess_b${color}t60.png`, ncolor, 'bishop');
  const _torre = new Pieza(7, y, `./Chess_r${color}t60.png`, ncolor, 'rook');
  const _knight = new Pieza(6, y, `./Chess_n${color}t60.png`, ncolor, 'knight');
  tableroIni.push(torre, _torre, knight, _knight, bishop, _bishop, king, queen);
}

let Turno=0;// Dicta si es turno de blancas o negras
let click=0;// Dicta si estoy eligiendo pieza o movíendola donde le toque

export default function Tablero() {
  const posTableroRef=useRef(null);
  const posTablero = posTableroRef.current;// Posición del tablero
  const [posX, setposX] = useState(0);// Actualizar dinámicamente las fichas
  const [posY, setposY] = useState(0);
  const [PiezaActual, setPiezaActual] = useState(null);
  const [vectorPiezas, setvectorPiezas] = useState(
      tableroIni.map((Pieza) => Object.assign({}, Pieza)));
  function clickPieza(e) {
    if (click==0 && e.target.className == 'pieza' && posTablero) {
      setPiezaActual(e.target);
      click = (click + 1) % 2;
      const posX = Math.floor((e.clientX - posTablero.offsetLeft)/
            75);// el valor entero nos dirá la casilla donde está
      const posY = Math.abs(Math.floor((e.clientY - posTablero.offsetTop)/
            75)-7);// el valor entero nos dirá la casilla donde está
      setposX(posX);
      setposY(posY);
    } else if (click) {
      if (PiezaActual && posTablero) {
        const x = Math.floor((e.clientX - posTablero.offsetLeft)/75);
        // el valor entero nos dirá la casilla donde está
        const y = Math.abs(Math.floor((e.clientY -
                posTablero.offsetTop)/75)-7);
        // Posición del ratón - posición respecto del
        // tablero / 75 por la longitud de la casilla
        // La corrección en el eje y es por cómo se definen
        // las coordenadas del ratón con respecto al tablero
        console.log(PiezaActual);
        setvectorPiezas((value) => {
          const piezas = value.map((p) => {
            if (p.x == posX && p.y == posY) {// Pieza encontrada
              p.x = x;
              p.y = y;
            }
            return p;
          });
          return piezas;
        });
        setPiezaActual(null);
        click = (click + 1) % 2;
      }
      // soltar pieza si jugada válida y actualizar su valor
      Turno = (Turno + 1) % 2;
    }
  }

  const board = [];

  for (let i = Vert.length - 1; i >= 0; i--) {
    for (let j = 0; j < Horz.length; j++) {
      let image = undefined;
      vectorPiezas.forEach((element) => {
        if (element.x === j && element.y === i) {
          image = element.imagen;
        }
      });
      board.push(<Casilla key = {`${i},${j}`}
        posicion={i + j + 2} imagen={image} />);
    }
  }

  return <div onMouseDown={(e) => clickPieza(e)}
    id="tablero" ref={posTableroRef}>{board}</div>;
}
