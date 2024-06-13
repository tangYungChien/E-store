import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setMemberName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      alert(response.data.message);
      setMemberName(username);
      navigate("/member");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="login-container">
      <h2>會員登入</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">用戶名</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登入</button>
      </form>
      <button onClick={() => navigate("/register")}>註冊會員</button>
    </div>
  );
};

export default Login;
