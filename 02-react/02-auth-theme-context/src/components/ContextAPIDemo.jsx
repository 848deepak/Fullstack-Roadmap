import React from "react";
import ChildContext from "./ChildContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const ContextAPIDemo = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="card">
        <h3>✅ Context API Pattern</h3>
        <p className="muted">
          Direct access to state from any component in the provider tree. No intermediate components needed.
        </p>
        <div style={{ marginTop: "16px" }}>
          <ChildContext />
        </div>
      </div>
    </div>
  );
};

export default ContextAPIDemo;
