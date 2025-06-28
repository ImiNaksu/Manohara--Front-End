import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!data.password || !data.email) {
      setErrorMessage("Please enter your credentials.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        navigate("/menu");
      } else {
        setErrorMessage(result.message || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={handleBack}>
        <ArrowLeft size={20} />
        Back
      </button>
      <div className="login-img"></div>
      <div className="login-content">
        <div className="login-form">
          <div className="lg-content">
            <h3>Login</h3>
          </div>
          <div className="lg-content form-content">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              required
              onChange={handleChange}
            />
            <div className="pw-cont">
              <label>Password</label>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={data.password}
              required
              onChange={handleChange}
            />
          </div>
          <div className="lg-content">
            <a href="/login">Forgot Password?</a>

            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
            <p>
              Don't have an account? <a href="/signup">Register</a>
            </p>
            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
