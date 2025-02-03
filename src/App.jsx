import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { turns } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App () {
  // CREA TABLERO como si fuera un estado, permite ver en que "estado" está el tablero
// el estado (board) representa la situación actual del tablero,
// primero se fija si tenemos una partida guardada en el local storage
// la guarda en boardFromStorage, si no hay nada en el local storage
// crea un tablero nuevo con 9 posiciones vacías
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(20).fill(null)
  })

  // crea el estado de turno actual, que puede ser x o o
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage || turns.X
  })

  const [winner, setWinner] = useState(null) // null no hay ganador, false empate

  const resetGame = () => {
  // para resetear el juego tenemos que setear los estados a sus valores iniciales
    setBoard(Array(20).fill(null))
    setTurn(turns.X)
    setWinner(null)

    // resetear el localstorage
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  // creamos la función para actualizar el tablero, se la pasamos a square como prop
  // en el área de renderización, pero NO como ejecución. En la creación del componente
  // square acalaramos que en onclick se ejecugta esa función
  const updateBoard = (index) => {
  // si hay algo en ese cuadrado o ya hay un ganador no se actualiza el cuadrado
    if (board[index] || winner) return
    // crea un nuevo tablero (que es un array), Usamos el operador spread (...) para crear una copia superficial del array board.
    // Esto es muy importante porque en React, no se debe modificar el estado directamente.
    const newBoard = [...board]
    // y en el índice que llegó por parámetro guarda x o o deacuero al turno actual
    newBoard[index] = turn
    // actualizar el estado board con el nuevo tablero (newBoard). Esto hará que React vuelva a renderizar el componente con el tablero actualizado.
    setBoard(newBoard)
    // cambia de turno
    const newTurn = turn === turns.X ? turns.O : turns.X
    setTurn(newTurn)
    // aquí guardamos la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // revisamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    // si hay ganador, cambiamos el estado de winner
    if (newWinner) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }, // Centro de la pantalla
        colors: ['#eee', '#233', '#d835d3'] // Colores personalizados
      })
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) { // verificamos si hay empate
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Cuatro en línea</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
       board.map((square, index) => {
         return (
           <Square
             key={index}
             index={index}
             updateBoard={updateBoard}
           >
             {square}
           </Square>
         )
       })
       }
      </section>
      <section className='turn'>
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
