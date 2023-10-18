import { useState } from "react";
import { Link } from "react-router-dom";

function Register(){
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
                        <h2>Đăng ký</h2>
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
                            <Link to='/' style={{textDecoration:'none'}}>Đăng nhập</Link>
                        </div>  
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Register