import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ text: "", color: "" });

  // Handle input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleBack = () => {
    navigate("/");
  };

  // Handle signup
  const handleSignup = async () => {
    // Validation
    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      setMessage({ text: "All fields are required.", color: "red" });
      return;
    }
    if (!isValidEmail(data.email)) {
      setMessage({ text: "Invalid email format.", color: "red" });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setMessage({ text: "Passwords do not match.", color: "red" });
      return;
    }

    // Clear error before sending request
    setMessage({ text: "" });

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: "User registered successfully!", color: "green" });

        // Redirect to login page after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setMessage({
          text: result.message || "Signup failed. Please try again.",
          color: "red",
        });
      }
    } catch (error) {
      setMessage({
        text: "Server error. Please try again later.",
        color: "red",
      });
      console.error("Error signing up:", error);
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
            <h3>Sign Up</h3>
          </div>
          <div className="lg-content form-content">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
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
              onChange={handleChange}
            />
            <div className="pw-cont">
              <label>Confirm Password</label>
            </div>
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="lg-content">
            <button className="login-btn" onClick={handleSignup}>
              Register
            </button>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
            {/* Display messages above the Register button */}
            {message.text && (
              <p style={{ color: message.color, textAlign: "center" }}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
