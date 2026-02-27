import React from "react";

const GrandChild = ({ message, userRole, theme }) => {
  return (
    <div className="drilling-container grandchild-box">
      <div className="level-label">GrandChild Component</div>
      <p className="final-message">Final Message: {message}</p>
      <div className="prop-display">
        <p><strong>Role:</strong> {userRole}</p>
        <p><strong>Theme:</strong> {theme}</p>
      </div>
    </div>
  );
};

export default GrandChild;
