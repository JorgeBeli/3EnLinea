import { useState } from "react"

const turns = {
  x: 'X',
  o: 'O'
}


const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [ board, setBoard ] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(turns.x)

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if(board[index]) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)
  }

  return(
    <main className='board'>
      <h1>3 En Linea</h1>
      <section className='game'>
        {
          board.map((cell, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === turns.x}>
          {turns.x}
        </Square>
        <Square isSelected={turn === turns.o}>
          {turns.o}
        </Square>
      </section>
    </main>
  )
}

export default App