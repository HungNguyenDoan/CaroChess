import { Select } from "antd";
import { useState } from "react";
import axiosPro from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";

function Level(){
    const [level,setLevel]=useState()
    const [symbol,setSymbol]=useState()
    const navigate = useNavigate()
    const handleStart = async (e) => {
        e.preventDefault();
        const registrationData = {
            levelId:level,
            first:symbol
        };
        console.log(registrationData)
        try{  
            const token = localStorage.getItem('token');  
            const config = {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
            };        
            const data= await axiosPro.post('/game/init',registrationData,config);
            console.log(data.data.game.id)
            navigate(`/play/${data.data.game.id}/${symbol}`)
        }
        catch(error){
            console.log(error)         
        }
    };
    return(
        <section>
            <div className="form-box">
                <form>
                    <h2>Thiết lập trận đấu</h2>
                    <div style={{marginBottom:'36px'}}>
                        <label style={{color:'#fff'}}>Độ khó</label>
                        <Select
                        style={{
                        width: 120,
                        marginLeft:'100px'
                        }}
                        name="level"
                        
                        onChange={(value) => setLevel(value)} 
                        options={[
                        {
                            value: '1',
                            label: 'Dễ',
                        },
                        {
                            value: '2',
                            label: 'Trung bình',
                        },
                        {
                            value: '3',
                            label: 'Khó',
                        },
                        ]}
                        />
                    </div>
                    <div style={{marginBottom:'36px'}}>
                        <label style={{color:'#fff'}}>Ký hiệu</label>
                        <Select
                        style={{
                        width: 120,
                        marginLeft:'100px'
                        }}
                        name="symbol"
                        
                        onChange={(value) => setSymbol(value)} 
                        options={[
                        {
                            value: '1',
                            label: 'X',
                        },
                        {
                            value: '0',
                            label: 'O',
                        }
                        ]}
                        />
                    </div>
                    <button onClick={handleStart}>Bắt đầu</button>
                </form>
            </div>
        </section>
    );
}
export default Level