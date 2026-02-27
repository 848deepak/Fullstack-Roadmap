import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAuth();
  const isDark = theme === "dark";

  return (
    <div className="theme-toggle">
      <span className="muted">Theme</span>
      <label className="switch">
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className="slider" />
      </label>
      <span className="theme-label">{isDark ? "Dark" : "Light"}</span>
    </div>
  );
};

export default ThemeToggle;
