import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import axiosPro from "../axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Level(){
    const [level,setLevel]=useState()
    const [symbol,setSymbol]=useState()
    const [type,setType]=useState('api')
    const navigate = useNavigate()
    const [name,setName]=useState([])
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
    useEffect(()=>{
        async function fetchData() {
            const token = localStorage.getItem('token');  
            const config = {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
            };  
            const data= await axiosPro.get('/level/all',config);
            console.log(data.data.response)
            setName(data.data.response)
        }
        fetchData(); 
    },[type])
    return(
        <section>
            <div className="form-box">
                <form>
                    <h2>Thiết lập trận đấu</h2>
                    <div style={{marginBottom:'36px'}}>
                        <label style={{color:'#fff'}}>Level</label>
                        <Select
                        style={{
                        width: 120,
                        marginLeft:'100px'
                        }}
                        name="level"
                        
                        onChange={(value) => setLevel(value)} 
                        >
                        {name.map((option) => (                    
                            <Select.Option key={option.id} value={option.id}>
                              {option.level_name}
                            </Select.Option>
                        ))}
                        
                        </Select>
                    </div>
                    <div style={{marginBottom:'36px'}}>
                        <label style={{color:'#fff'}}>Ký hiệu</label>
                        <Select
                        style={{
                        width: 120,
                        marginLeft:'86px'
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
                    <Button style={{
                        width:'100px',
                        height:'30px',
                        borderRadius:'20px',
                        border:'none',
                        marginLeft:'80px',
                        marginBottom:'20px'
                    }} onClick={handleStart}>Bắt đầu</Button>
                    <div>
                        <Link to='/home' style={{textDecoration:'none',color:'black'}}>
                            Quay lại
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default Level