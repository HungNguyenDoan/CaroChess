import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const FE = () => {
  const [board, setBoard] = useState(Array(225).fill('0'));
  const [disabled, setDisable] = useState('auto');
  const [ws, setWs] = useState(null);
  const {id,symbol}=useParams();
  const {hard,hardLevel}=useParams();
  const {level,gameLevel} = useParams();
  const [result,setResult]=useState('');
  
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
      if(returnString==='win'){
        setResult('Win')
      }
      else if(returnString==='lose'){
        setResult('Lose')
      }
      else{
        const newBoard= returnString.split('')
        setBoard(newBoard)
        setDisable('auto')
      }      
    };
  };
  
  const sendMove = (e) => {
    const data = {
      id:id,
      hard:hard,
      level: level,
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
      <div style={{
        fontSize:'35px',
        height:'50px',
      }}>
        {result}
      </div>
      <div className="caro-board">
          {board.map((cell, index) => (
            <div key={index} className="cell">
              {renderCell(cell, index)}
            </div>
          ))}
      </div>
      <Link to='/home' style={{textDecoration:'none',color:'black'}}>
        Quay lại
      </Link>
    </div>
  );
};

export default FE;