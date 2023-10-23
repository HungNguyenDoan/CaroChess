import React, { useEffect, useState } from 'react';
import WebSocketClient from 'websocket';
import WebSocket from 'ws';
const FE = () => {
  const [board, setBoard] = useState(Array(20).fill(Array(20).fill(null)));
  const [xIsNext, setXIsNext] = useState(true);
  const [ws, setWs] = useState(null);
  useEffect(() => {
    try{
      const newWs  = new WebSocket('ws://localhost:8080/api/play');
    setWs(newWs );
    
    }
    catch(err){
      console.error(err);
    }

    
    // newWs.on('message', (data) => {
    //   handleServerData(data);
    // });

    // return () => {
    //   newWs.close();
    // };
  }, []);
  const sendMove = (i, j) => {
    const data = {
      type: 'move',
      coordinates: { row: i, col: j },
    };

    ws.send(JSON.stringify(data));
  };
  const handleClick = (i,j) => {
    if (board[i][j] === null) {
      const newBoard = board.map((row) => [...row]);
      newBoard[i][j] = xIsNext ? 'X' : 'O';
      setBoard(newBoard);
  
      // Gửi thông tin nước đi
      // sendMove(i, j);
  
      // Chuyển đổi lượt chơi
      setXIsNext(!xIsNext);
  };
  }
  const handleServerData = (data) => {
    try {
      const serverData = JSON.parse(data);
      if (serverData.type === 'move') {
        // Xử lý nước đi của đối thủ
        const { row, col } = serverData.coordinates;
        if (board[row][col] === null) {
          const newBoard = [...board];
          newBoard[row][col] = xIsNext ? 'O' : 'X';
          setBoard(newBoard);
          setXIsNext(!xIsNext);
        }
      } else if (serverData.type === 'gameover') {
        // Xử lý sự kiện kết thúc trò chơi
        // Ví dụ: hiển thị thông báo chiến thắng hoặc hòa
      }
    } catch (error) {
      console.error('Lỗi khi xử lý dữ liệu từ máy chủ:', error);
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
}
export default FE