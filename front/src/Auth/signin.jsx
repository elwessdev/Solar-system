import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./auth.scss";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/auth/login`, { email, password });
        if (res.data.error) {
          setError(res.data.error);
        } else {
          if(res.data.user.status == "block"){
            setError("Your account has been blocked, Contact support for more information");
          } else {
            setError("");
            login(res.data.user, res.data.token);
            // console.log("Sign done");
            navigate('/');
          }
        }
      } catch (e) {
        console.error("Error during login:", e.response?.data || e.message);
        setError("Failed to sign in. Please try again.");
      }
    } else {
      setError("Email and password are required.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <form>
          <h1>Sign In</h1>
          <span>Welcome Back!</span>
          <div className="inpts">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Link to="/signup">Register Now</Link>
          <Link to="/forgot-password">Forgot Your Password?</Link>
          <button onClick={handleLogin} type="button">
            Sign In
          </button>
        </form>
        <div className="error">{error}</div>
      </div>
    </div>
  );
};

export default Signin;
