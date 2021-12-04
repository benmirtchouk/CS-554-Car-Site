import React from "react";
import Sidebar from "../sidebars/Sidebar";

const FindByYear = () => {
  const slinks = [
    { name: "Find by Make", link: "/find_by_make" },
    { name: "Find by Model", link: "/find_by_model" },
    { name: "Find by Vin", link: "/find_by_vin" },
  ];
  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Find Car by Year</h1>
        <br />
        <br />
        <p>This is the Find Car by Year page.</p>
      </div>
    </div>
  );
};

export default FindByYear;
