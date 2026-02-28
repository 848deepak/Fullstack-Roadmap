import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const UserStatus = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="status-block">
      <h3 className="session-title">
        {isAuthenticated ? `Hello, ${user.name}` : "Session"}
      </h3>
      <div className="status">
        <span className={`dot ${isAuthenticated ? "online" : "offline"}`} />
        {isAuthenticated ? "Logged in" : "Not logged in"}
      </div>
    </div>
  );
};

export default UserStatus;
