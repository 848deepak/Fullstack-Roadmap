import React from "react";
import GrandChildContext from "./GrandChildContext.jsx";

const ChildContext = () => {
  return (
    <div className="card nested">
      <h4>Child Component (via Context)</h4>
      <p className="muted">No props passed – GrandChild accesses context directly</p>
      <div style={{ marginTop: "16px" }}>
        <GrandChildContext />
      </div>
    </div>
  );
};

export default ChildContext;
