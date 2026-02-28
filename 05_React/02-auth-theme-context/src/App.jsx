import React from "react";
import LoginPanel from "./components/LoginPanel.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import UserStatus from "./components/UserStatus.jsx";
import PropDrillingDemo from "./components/PropDrillingDemo.jsx";
import ContextAPIDemo from "./components/ContextAPIDemo.jsx";
import "./app.css";

const App = () => {
  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Experiment 2 · Q1</p>
          <h1>Auth & Theme (Context API)</h1>
          <p className="muted">Login, logout, and theme toggle using global context.</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="grid">
        <LoginPanel />
        <div className="card">
          <UserStatus />
        </div>
      </section>

      <section>
        <h2>Prop Drilling vs Context</h2>
        <div className="grid">
          <PropDrillingDemo />
          <ContextAPIDemo />
        </div>
      </section>
    </div>
  );
};

export default App;
