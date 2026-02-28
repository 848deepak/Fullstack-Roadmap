import React from "react";

const ReduxSummary = () => {
  return (
    <div className="card">
      <h3>Redux Store</h3>
      <ul className="list">
        <li>Centralized product state in a store</li>
        <li>Reducers update state predictably</li>
        <li>Async fetch handled with thunk</li>
      </ul>
    </div>
  );
};

export default ReduxSummary;
