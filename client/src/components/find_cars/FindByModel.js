import React from "react";
import Sidebar from "../sidebars/Sidebar";

const FindByModel = () => {
  const slinks = [
    { name: "Find by Make", link: "/find_by_make" },
    { name: "Find by Year", link: "/find_by_year" },
    { name: "Find by Vin", link: "/find_by_vin" },
  ];
  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Find Car by Model</h1>
        <br />
        <br />
        <p>This is the Find Car by Model page.</p>
      </div>
    </div>
  );
};

export default FindByModel;
