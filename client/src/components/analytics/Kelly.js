import React from "react";
import Sidebar from "../sidebars/Sidebar";

const Kelly = () => {
  const slinks = [
    { name: "DOT", link: "/dot" },
    { name: "Safety", link: "/safety" },
  ];

  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Kelly Bluebook Values</h1>
        <br />
        <br />
        <p>This is the Kelly page.</p>
      </div>
    </div>
  );
};

export default Kelly;
