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
        console.log("render")     
    }, [type]);
    const handleOut=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/')
    }
    return(
        <section>
            <div className="form-box">
                <form>
                    <h2>Cờ caro</h2>
                    <div className="name">
                        Người chơi: {name}
                    </div>
                    <div>
                        <Button className="button1">
                            <Link to='/level'>Chơi</Link>
                        </Button>
                        <Button className="button1">Lịch sử thi đấu</Button>
                        <Button className="button1">Bảng xếp hạng</Button>
                    </div>
                    <Button onClick={handleOut} className="out">Đăng xuất</Button>
                </form>
            </div>
        </section>
    );
}
export default Home