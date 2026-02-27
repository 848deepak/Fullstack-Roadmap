import React from "react";
import GrandChild from "./GrandChild.jsx";

const Child = ({ message, userRole, theme }) => {
  return (
    <div className="drilling-container child-box">
      <div className="level-label">Child Component</div>
      <p className="level-text">Received message from Parent, passing to GrandChild...</p>
      <GrandChild message={message} userRole={userRole} theme={theme} />
    </div>
  );
};

export default Child;
