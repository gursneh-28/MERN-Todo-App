import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./apiRoutes";
import './LoginSignup.css';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await loginUser({username, password});
            if (res.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", username);
                navigate("/Main");
            } else {
                alert("Login failed: No token received.");
            }
        }
        catch (err) {
            console.error("Login error:", err);
            alert("Login failed");
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer", marginLeft: "8px" }}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/Signup">Signup</a>
            </p>
        </div>
    );
}

export default Login;