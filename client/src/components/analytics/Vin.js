import React from "react";
import Sidebar from "../sidebars/Sidebar";

const Vin = () => {
  const slinks = [{ name: "Safety", link: "/safety" }];

  return (
    <div className="main_layout">
      <Sidebar sideLinks={slinks} />
      <div className="mainbody">
        <h1>VIN</h1>
        <br />
        <br />
        <p>This is the Vin page.</p>
      </div>
    </div>
  );
};

export default Vin;
