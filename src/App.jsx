import { useState } from "react";
import "./index.css";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

// Dato: Al utilizar un Componente -> NO es OBLIGATORIO que ese Componente USE a TODAS las props
const Square = ({ children, isSelected, updateBoard, index }) => {

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={isSelected ? "square is-selected" : "square"}>
      {children}
    </div>
  );
};

function App() {
  // Array(9).fill(null) -> Crear un ARRAY de 9 ELEMENTOS y cada ELEMENTO se RELLENA con "null"
  // Este ESTADO es para los VALORES del TABLAERO (Array de Elementos)
  const [board, setBoard] = useState(Array(9).fill(null));

  // Este ESTADO es para el TURNO del JUGADOR (X) o (O)
  const [turn, setTurn] = useState(TURNS.X);

  // Este ESTADO es para saber si ya hay un GANADOR -> null = NO hay ganador, false = Hay un EMPATE y true = SÍ hay un ganador
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    /*
      Dato: Si se tiene un ESTADO que es un ARRAY y queremos modificar uno de sus Elementos -> Se debe CREAR una COPIA de ese ARRAY y a esa COPIA es a la que se le MODIFICARÁ el Elemento que queríamos MODIFICAR al ARRAY ORIGINAL.
        - En términos simples, tenemos que tomar al VALOR de un ESTADO como algo INMUTABLE
    */

    if(board[index]) return;

    const newBoard = [...board]; // Hasta acá newBoard tendrá los MISMOS valores que el BOARD  ACTUAL
    newBoard[index] = turn; // Acá ACTUALIZO el SQUARE CLICKEADO, para eso solo actualizo al Elemento del Array que es el SQUARE
    setBoard(newBoard); // Acá ACTUALIZO el SQUARE ANTERIOR con este NUEVO SQUARE formado con el CLICK realizado por el usuario

    // Actualizo el TURNO, si el TURNO es X ahora será O, y si era O ahora será X
    const newTurn = turn === TURNS.X ? TURNS.O: TURNS.X;
    setTurn(newTurn);
  }

  // Cosas para MEJORAR:
  // 1. El juego NO termina NUNCA
  // 2. SE puede hacer más de un CLICK en un SQUARE

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
