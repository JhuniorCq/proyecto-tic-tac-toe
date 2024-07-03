import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // Se ITERA el Array WINNER_COMBOS para ver si se está cumpliendo algún COMBO en el Tablero
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] && // Al ver si existe o no, estamos comprobando que acá hay un X o un O, pero sí o sí uno de esos dos
      boardToCheck[a] === boardToCheck[b] && // Hasta acá comprobamos que los Squares del Board con índices a y b son IGUALES
      boardToCheck[a] === boardToCheck[c] // Y acá comprobamos que los Squares del Board con índices a y c son IGUALES -> Por ende si a y c son iguales, y a y b también son iguales, podemos decir que b y c también lo son
    ) {
      return boardToCheck[a]; // Esto me devuelve el Valor del Square con índice "a" -> Este Valor puede ser X o O
    }
  }
  // Si se retorna "null", entonces aún NO hay un Ganador
  return null;
};

// Esta Función es para verificar si el juego ha TERMINADO y ha habido un EMPATE -> Lo que hará es VERIFICAR que NO haya ningún espacio vacío, para esto va a comprobar que cada ESPACIO tiene un VALOR DIFERENTE de NULL
export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null);
};
