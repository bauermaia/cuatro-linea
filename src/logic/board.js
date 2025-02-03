import { winner_combos } from '../constants.js'

// función para verificar si alguien gana, recibe un board
export const checkWinner = (boardToCheck) => {
  // revisa todas  las combinaciones para ver si hay un ganador
  for (const combo of winner_combos) {
    // guarda en a b c los numeros de cada combinación
    const [a, b, c, d] = combo
    if (
      // si el cuadrado del tablero que está en la posición a contiene algo
      boardToCheck[a] &&
      // y es igual a lo que contiene el cuadrado del tablero en la posición b y c
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c] &&
      boardToCheck[a] === boardToCheck[d]
    ) {
      // es el ganador
      return boardToCheck[a]
    }
  }
  // no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  // revisamos si hay empate viendo si quedan espacios vacíos en el tablero
  return newBoard.every((square) => square !== null) // si todos los square del tablero son diferentes a null devuelve true
}
