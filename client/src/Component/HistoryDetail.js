import { Link, useParams } from "react-router-dom";

function HistoryDetail(){
    const {id}=useParams()
    const result = localStorage.getItem('result');
    const status = localStorage.getItem('status'); 
    const board=status.split('')   
    const renderCell = (cellValue, index) => {  
        if (cellValue === '1') {
          return 'X';
        } else if (cellValue === '2') {
          return 'O';
        } else {
          return (
              <div className="empty-cell" ></div>
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
          <Link to='/history' style={{textDecoration:'none',color:'black'}}>
            Quay lại
          </Link>
        </div>
      );
}
export default HistoryDetail