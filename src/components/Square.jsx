// cada cuadrado del tablero, children: lo que tendrá dentro, actualizarlo al hacer click: updateboard
// index para saber a que cuadrado corresponde
// esto está creando un componente funcional:
export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''} `

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
