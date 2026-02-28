import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const GrandChildContext = () => {
  const { user, theme } = useAuth();

  return (
    <div className="card">
      <h4>Grand Child Component (via Context)</h4>
      <div className="prop-display">
        <p>
          <strong>User:</strong> <span className="highlight">{user ? user.name : "Not logged in"}</span>
        </p>
        <p>
          <strong>User Role:</strong> <span className="highlight">{user ? "Admin" : "Guest"}</span>
        </p>
        <p>
          <strong>Theme:</strong> <span className="highlight">{theme}</span>
        </p>
      </div>
      <p className="muted">
        ✅ This component directly accesses context without prop drilling
      </p>
    </div>
  );
};

export default GrandChildContext;
