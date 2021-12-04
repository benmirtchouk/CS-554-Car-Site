import React from "react";
import Sidebar from "../sidebars/Sidebar";

const RecentSales = () => {
  const slinks = [{ name: "Sellers", link: "/sellers" }];
  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Recent Sales</h1>
        <br />
        <br />
        <p>This is the Recent Sales page.</p>
      </div>
    </div>
  );
};

export default RecentSales;
