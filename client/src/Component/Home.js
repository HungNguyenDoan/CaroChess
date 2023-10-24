import { Button } from "antd";
import "./css/style.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Home(){
    const [type,setType]=useState('login')
    const [name,setName]=useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');  
        const name = localStorage.getItem('name');  
        setName(name)
        console.log(token)     
    }, [type]);
    const handleOut=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/')
    }
    return(
        <section>
            <div className="form-box">
                <form style={{
                    width:'300px'
                }}>
                    <h2>Cờ caro</h2>
                    <div className="name">
                        Người chơi: {name}
                    </div>
                    <div>
                        <Button className="button1">
                            <Link to='/level'>Chơi</Link>
                        </Button>
                        <Button className="button1">
                            <Link to='/history'>Lịch sử thi đấu</Link>
                        </Button>
                        
                    </div>
                    <Button onClick={handleOut} className="out">Đăng xuất</Button>
                </form>
            </div>
        </section>
    );
}
export default Home