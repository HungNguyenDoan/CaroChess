import React, { useState } from "react";
import "./css/style.css";
import { Link } from "react-router-dom";
function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    
    const handleLogin = () => {
        
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
                            <Link to='/register' style={{textDecoration:'none'}}>Đăng ký</Link>
                        </div>                     
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Login