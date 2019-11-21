import React from "react";
import Payments from "./payment/Payments";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Emaily</h1>
      <p>Collect feedback</p>
      <div>
        <Payments />
      </div>
    </div>
  );
};

export default Landing;
