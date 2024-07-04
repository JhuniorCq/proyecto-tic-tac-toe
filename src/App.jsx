import { Square } from "./components/Square";
import { useState } from "react";
import { TURNS } from "./constants";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { Board } from "./components/Board";
import { saveGameToStorage, resetGameToStorage } from "./logic/localStorage";
import confetti from "canvas-confetti";

function App() {

  // Este ESTADO es para los VALORES del TABLERO (Array de Elementos)
  const [board, setBoard] = useState(() => {
    // Leer del LOCAL STORAGE es SÚPER LENTO y es SÍNCRONO (Por lo que NO se puede continuar con lo demás hasta que termine)
    // Esto uso del localStorage NO está afuera del useState porque sino se ejecutaría en cada renderizado
    const boardFromStorage = window.localStorage.getItem("board"); 
    return boardFromStorage ? JSON.parse(boardFromStorage): Array(9).fill(null);
  });

  // Este ESTADO es para el TURNO del JUGADOR (X) o (O)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  // Este ESTADO es para saber si ya hay un GANADOR -> null = NO hay ganador, false = Hay un EMPATE y true = SÍ hay un ganador
  const [winner, setWinner] = useState(null);

  // Esta función RESETEARÁ EL JUEGO -> Esta función es válida para cualquier CASO DE USO en donde querámos resetear un proceso, por ejemplo un Formulario -> Para esto debemos SETEAR todos lo ESTADOS a sus VALORES INICIALES
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // Cuando el usuario RESETEA el juego e inmediatamente realiza un F5, lo que pasará es que el localStorage hará que el TABLERO tenga lo que tenía ALMACENADO antes del RESETEO -> Para solucionar esto, haremos que cuando el usuario RESETEE el juego, también se RESETEE lo que almacenamos en el localStorage
    resetGameToStorage();
  };
  
  const updateBoard = (index) => {
    /*
      Dato: Si se tiene un ESTADO que es un ARRAY y queremos modificar uno de sus Elementos -> Se debe CREAR una COPIA de ese ARRAY y a esa COPIA es a la que se le MODIFICARÁ el Elemento que queríamos MODIFICAR al ARRAY ORIGINAL.
        - En términos simples, tenemos que tomar al VALOR de un ESTADO como algo INMUTABLE
    */

    if(board[index] || winner) return;

    const newBoard = [...board]; // Hasta acá newBoard tendrá los MISMOS valores que el BOARD ACTUAL
    newBoard[index] = turn; // Acá ACTUALIZO el SQUARE CLICKEADO, para eso solo actualizo al Elemento del Array que es el SQUARE
    setBoard(newBoard); // Acá ACTUALIZO el BOARD ANTERIOR con este NUEVO BOARD formado al dar CLICK en algún SQUARE

    // Actualizo el TURNO, si el TURNO es X ahora será O, y si era O ahora será X
    const newTurn = turn === TURNS.X ? TURNS.O: TURNS.X;
    setTurn(newTurn);

    // GUARDAREMOS LA PARTIDA acá, porque en este punto ya se lanzo el SET para actualizar el TURNO (y para este entonces el Usuario ya ha utilizado este TURNO)
    // Convertimos el newBoard (que es un ARRAY) en un JSON, para que así este ARRAY sea un String con la forma de un ARRAY y así el localStorage convertirá el ARRAY newBoard en un String sin afectarlo en nada, ya que convertimos el newBoard en un JSON
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });

    // Revisamos si hay un Ganador
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner) {
      // LA ACTUALIZACIÓN DE LOS ESTADOS EN REACT SON ASÍNCRONOS -> Por eso es que si IMPRIMIMOS o UTILIZAMOS el VALOR DEL ESTADO inmediatamente después llamar a su Función SET, pero dentro del mismo BLOQUE DE CÓDIGO -> El ESTADO aún tendrá su MISMO VALOR, como si NO se hubiera hecho el SET -> Para solucionar esto es que se usa el useEffect, ya que el useEffect ejecutará el código que queramos CUANDO YA se haya logrado la ACTUALIZACIÓN DEL ESTADO
      confetti();
      setWinner(newWinner);
    } else if(checkEndGame(newBoard)) { // Evalúa el empate
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Resetear el juego</button>

      <Board board={board} updateBoard={updateBoard} />

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

    </main>
  );
}

export default App;
