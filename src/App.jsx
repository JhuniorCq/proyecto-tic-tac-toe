import { Square } from "./components/Square";
import { useState } from "react";
import { TURNS } from "./constants";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { Board } from "./components/Board";
import { saveGameToStorage, resetGameToStorage } from "./logic/localStorage";
import confetti from "canvas-confetti";

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board"); 
    return boardFromStorage ? JSON.parse(boardFromStorage): Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameToStorage();
  };
  
  const updateBoard = (index) => {

    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O: TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });

    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner);
    } else if(checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1><span className="textRed">Tic</span> tac <span className="textRed">Toe</span></h1>
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
