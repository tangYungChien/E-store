import React, { useState } from "react";
// import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // 處理登入邏輯，例如發送 API 請求
    alert(`登入成功: ${username}`);
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
    </div>
  );
};

export default Login;
