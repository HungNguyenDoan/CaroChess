import React, { useState } from "react";
import "./css/style.css";
import { Link, useNavigate } from "react-router-dom";
import axiosPro from "../axios/axiosConfig";
function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        const registrationData = {
            username: username,
            password: password,
        };
        try{          
            const data= await axiosPro.post('/auth/login',registrationData);
            console.log(data)
            setLoginMessage("Đăng nhập thành công")
            const response = data.data
            if (response) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('name', response.data.name);
            }
            const token = localStorage.getItem('token');  
            const name = localStorage.getItem('name');  
            navigate('/home')
        }
        catch(error){
            console.log(error)
            setLoginMessage("Tài khoản hoặc mật khẩu không khớp")
        }
    };

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form>
                        <h2>Đăng nhập</h2>
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
                        <button className="button2" onClick={handleLogin}>Đăng nhập</button>
                        <div className="link">   
                            <Link to='/register' style={{textDecoration:'none',color:'black'}}>Đăng ký</Link>
                        </div>                     
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Login