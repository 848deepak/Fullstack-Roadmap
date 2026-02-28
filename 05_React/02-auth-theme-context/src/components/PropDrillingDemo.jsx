import React from "react";
import Child from "./Child.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const PropDrillingDemo = () => {
  const { user, theme } = useAuth();

  const message = "Hello from Parent!";
  const userRole = user ? "Admin" : "Guest";

  return (
    <div className="drilling-wrapper">
      <h3 className="drilling-title">❌ Prop Drilling Demo</h3>
      <p className="drilling-info">Watch how props are passed from Parent → Child → GrandChild:</p>
      <div className="drilling-container parent-box">
        <div className="level-label">Parent Component</div>
        <p className="level-text">Passing message to Child...</p>
        <Child message={message} userRole={userRole} theme={theme} />
      </div>
    </div>
  );
};

export default PropDrillingDemo;
