import React, { useState } from 'react';
import Game from './Game';
const FE = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  
 
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();
    
    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: currentSquares }]))    ;
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Game squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      
    </div>
  );
}
export default FE