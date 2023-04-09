import { useState } from "react"

const turns = {
  x: 'X',
  o: 'O'
}

const winnerCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]



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
 
  const checkWinnerFrom = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of winnerCombos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null)
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return(
    <main className='board'>
      <h1>3 En Linea</h1>
      <button onClick={resetGame}>Reset Game</button>
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó ' + winner
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>
                  Empezar de nuevo
                </button>
              </footer>
            </div>
          </section>
        )
      }
      
    </main>
  )
}

export default App