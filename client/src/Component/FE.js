import React, { useEffect, useState } from 'react';

const FE = () => {
  const [board, setBoard] = useState(Array(20).fill(Array(20).fill(null)));
  const [xIsNext, setXIsNext] = useState(true);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    try {
      const newWs = new WebSocket('ws://localhost:8080/api/play');
      setWs(newWs);

      newWs.onmessage = (event) => {
        handleServerData(event.data);
      };

      return () => {
        newWs.close();
      };
    } catch (err) {
      console.error(err);
    }
  }, []);

  const sendMove = (i, j) => {
    const data = {
      type: 'move',
      coordinates: { row: i, col: j },
    };

    ws.send(JSON.stringify(data));
  };

  const handleClick = (i, j) => {
    if (board[i][j] === null) {
      const newBoard = board.map((row) => [...row]);
      newBoard[i][j] = xIsNext ? 'X' : 'O';
      setBoard(newBoard);

      // Send move information to the server
      sendMove(i, j);

      // Toggle player's turn
      setXIsNext(!xIsNext);
    }
  };

  const handleServerData = (data) => {
    try {
      const serverData = JSON.parse(data);
      if (serverData.type === 'move') {
        // Handle the opponent's move
        const { row, col } = serverData.coordinates;
        if (board[row][col] === null) {
          const newBoard = [...board];
          newBoard[row][col] = xIsNext ? 'O' : 'X';
          setBoard(newBoard);
          setXIsNext(!xIsNext);
        }
      } else if (serverData.type === 'gameover') {
        // Handle game over event
        // For example, display a win or draw message
      }
    } catch (error) {
      console.error('Error handling data from the server:', error);
    }
  };

  return (
    <div className="App">
      <div className="caro-board">
        {board.map((row, i) => (
          <div key={i} className="caro-row">
            {row.map((cell, j) => (
              <div
                key={j}
                className="caro-cell"
                onClick={() => handleClick(i, j)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FE;