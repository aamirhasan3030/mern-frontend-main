import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Login.css";
export default function Login() {
  const {user, setUser} = useContext(AppContext);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <div className="login-error">{error}</div>}
      <p>
        <input
          type="text"
          className="login-input"
          placeholder="Email Address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </p>
      <p>
        <button className="login-btn" onClick={handleSubmit}>Submit</button>
      </p>
      <hr className="login-divider" />
      <Link to="/register" className="login-link">Create Account</Link>
    </div>
  );
}
