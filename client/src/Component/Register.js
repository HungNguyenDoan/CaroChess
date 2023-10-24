import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosPro from "../axios/axiosConfig";

function Register(){
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        const registrationData = {
            name: name,
            username: username,
            password: password,
        };
        try{          
            const data= await axiosPro.post('/auth/register',registrationData);
            setLoginMessage("Đăng ký thành công")
        }
        catch(error){
            console.log(error)
            setLoginMessage("Tài khoản đã tồn tại")
        }
    };
    
    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form>
                        <h2>Đăng ký</h2>
                        <div className="inputbox">
                            <input
                                name="name" 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="">Tên của bạn</label>
                        </div>
                        <div className="inputbox">
                            <input
                                name="username" 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="">Tên đăng nhập</label>
                        </div>
                        <div className="inputbox">
                            <input 
                                name="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="">Mật khẩu</label>
                        </div>
                        <div className="error">{loginMessage}</div>
                        <button className="button2" onClick={handleLogin}>Đăng ký</button>
                        <div className="link">   
                            <Link to='/' style={{textDecoration:'none',color:'black'}}>Đăng nhập</Link>
                        </div>  
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Register