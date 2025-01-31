import { Square } from './Square'
export function WinnerModal ({ winner, resetGame }) {
  if (winner == null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó: '

  return (
  // si winner es diferente a null puede ser false, x o o,
  // renderizamos un modal, es un renderizado condicional
  // además si hay un winner lo dibuja dentro de un square dentro del modal

    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}
