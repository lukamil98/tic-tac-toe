import React, { useState } from "react"
import "./App.css"

const initialBoard = Array(9).fill(null)

const App = () => {
  const [board, setBoard] = useState(initialBoard) // State to track the current board.
  const [xIsNext, setXIsNext] = useState(true) // State to track the current player.

  const handleClick = (index) => {
    if (calculateWinner(board) || board[index]) {
      // If there is a winner or the square is already filled, return early.
      return
    }

    const newBoard = [...board]
    newBoard[index] = xIsNext ? "X" : "O" // Place X or O on the clicked square.
    setBoard(newBoard) // Update the board state.
    setXIsNext(!xIsNext) // Switch the current player.
  }

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    )
  }

  const resetGame = () => {
    setBoard(initialBoard) // Reset the board to initial state.
    setXIsNext(true) // Set the first player as X again.
  }

  const winner = calculateWinner(board)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (board.every((square) => square !== null)) {
    status = "It's a draw!"
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <div className="game">
      <div className="board">
        <div className="status">{status}</div>
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  )
}

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] // If a winning combination is found, return the winner (X or O)
    }
  }

  return null // If no winner is found, return null
}

export default App
