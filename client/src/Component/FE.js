import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FE = () => {
  const [board, setBoard] = useState(Array(400).fill('0'));
  const [disabled, setDisable] = useState('auto');
  const [ws, setWs] = useState(null);
  const {id,symbol}=useParams()
  
  
  useEffect(() => {
    try {   
      const newWs = new WebSocket('ws://localhost:8080/api/play');
      setWs(newWs);
      newWs.onopen = () => {
        console.log('WebSocket connected');
      };
      
      return () => {
        newWs.close();
      };
    } catch (err) {
      console.error(err);
    }
  }, []);
  const returnMove = () => {
    ws.onmessage = (event) => {
      const returnString=event.data
      const newBoard= returnString.split('')
      setBoard(newBoard)
      setDisable('auto')
    };
  };
  
  const sendMove = (e) => {
    const data = {
      id:id,
      chess:e
    };
    ws.send(JSON.stringify(data));
  };

  const renderCell = (cellValue, index) => {
    const handleClick = () => {
      if (cellValue === '0') {
        const newBoard = [...board];
        if(symbol==='1'){
          newBoard[index] = '1'; 
        }
        else{newBoard[index] = '2';}
        const boardString=newBoard.join('');
        setBoard(newBoard);      
        sendMove(boardString)     
        setDisable('none') 
      }
      returnMove()
    };

    if (cellValue === '1') {
      return 'X';
    } else if (cellValue === '2') {
      return 'O';
    } else {
      return (
          <div style={{pointerEvents:disabled}} className="empty-cell"  onClick={handleClick}></div>
      );
    }
  };

  return (
    <div className="App">
      <div>
        ID:{id}
      </div>
        <div className="caro-board">
          {board.map((cell, index) => (
            <div key={index} className="cell">
              {renderCell(cell, index)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FE;