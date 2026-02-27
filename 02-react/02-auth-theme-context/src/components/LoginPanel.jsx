import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const LoginPanel = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const ok = login(name, password);
    if (!ok) {
      setError("Please enter a name and password.");
      return;
    }
    setName("");
    setPassword("");
    setError("");
  };

  if (isAuthenticated) {
    return (
      <div className="card">
        <h3>Welcome back, {user.name} 👋</h3>
        <p className="muted">Logged in at: {new Date(user.loggedInAt).toLocaleString()}</p>
        <button className="danger" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label className="label">
        Full name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Akash Sharma"
        />
      </label>
      <label className="label">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPanel;
