import React from "react";
import Sidebar from "../sidebars/Sidebar";

const Safety = () => {
  const slinks = [
    { name: "DOT", link: "/dot" },
    { name: "Kelly", link: "/kelly" },
  ];

  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Safety</h1>
        <br />
        <br />
        <p>This is the Safety page.</p>
      </div>
    </div>
  );
};

export default Safety;
