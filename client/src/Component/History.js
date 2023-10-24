import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosPro from "../axios/axiosConfig";

const HistoryItem=({id,first,result,status,level})=>{
    const navigate = useNavigate()
    const handleClick=()=>{
        localStorage.setItem('status',status);
        localStorage.setItem('result', result);
        navigate(`/historydetail/${id}`)
    }
    if(first===1) first='X'
    else first='O'
    if(result===1) result='Win'
    else result='Lose'
    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                {first}
            </td>
            <td>
                {level}
            </td>
            <td>
                {result}
            </td>
            <td>
                <button onClick={handleClick}>Xem chi tiết</button>
            </td>
        </tr>
    );
}
function History(){
    const [type,setType]=useState('api')
    const [history,setHistory] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const token = localStorage.getItem('token');  
            const config = {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
            };        
            const data= await axiosPro.get('/game/history',config);
            console.log(data.data.games)
            setHistory(data.data.games)
        }
        fetchData(); 
    },[type])
    return(
        <section>
            <div className="form-box">
                    <div>
                        <div style={{
                            textAlign:'center',
                            fontWeight:'600',
                            fontSize:'24px',
                            marginBottom:'50px'
                        }}>
                        Lịch sử thi đấu
                        </div>
                        <div style={{
                            marginBottom:'50px'
                        }}>    
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ký hiệu</th>
                                        <th>Level</th>
                                        <th>Kết quả</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    
                                        {
                                            history.map((his)=>(
                                                <HistoryItem
                                                    key={his.id}
                                                    id={his.id}
                                                    first={his.first}
                                                    result={his.result}
                                                    status={his.status}
                                                    level={his.level_name}
                                                />
                                            ))
                                        }
                                    
                                </tbody>                              
                            </table>                          
                        </div>
                        <Link to='/home' style={{textDecoration:'none',color:'black'}}>
                        Quay lại
                        </Link>
                    </div>
            </div>
        </section>
    );
}
export default History