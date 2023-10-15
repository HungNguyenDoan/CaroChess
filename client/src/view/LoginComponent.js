import React, { useState } from "react";
import "./css/style.css";
function LoginCompnent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    
    const handleLogin = () => {
        fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },    
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
            const socket = new WebSocket("/message");
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log(message);
            };
            setLoginMessage("Đăng nhập thành công");
            } else {
            setLoginMessage("Đăng nhập thất bại. Vui lòng thử lại.");
            }
        });
    };

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <input
                                name="username" 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label for="">Username</label>
                        </div>
                        <div className="inputbox">
                            <input 
                                name="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label for="">Password</label>
                        </div>
                        <div className="error">{loginMessage}</div>
                        <button onClick={handleLogin}>Log in</button>
                        
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginCompnent;