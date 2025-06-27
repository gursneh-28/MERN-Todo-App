import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "./apiRoutes";
import './LoginSignup.css';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            const res = await signupUser({username, password});
            if (res.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", username);
                navigate("/Main");
            } else {
                alert("Signup failed: No token received.");
            }
        }
        catch (err) {
            console.error("Signup error:", err);
            alert("Signup failed !");
        }
    };

    return (
        <div className="signup-page">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
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
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <a href="/Login">Login</a>
            </p>
        </div>
    );
}

export default Signup;