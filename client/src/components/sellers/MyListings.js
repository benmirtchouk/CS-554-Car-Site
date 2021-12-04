import React from "react";
import Sidebar from "../sidebars/Sidebar";

const MyListings = () => {
  const slinks = [
    { name: "Sell A Car", link: "/sell_car" },
    { name: "Recent Sales", link: "/recent_sales" },
    { name: "Sellers", link: "/sellers" },
  ];

  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>My Listings</h1>
        <br />
        <br />
        <p>This is the My Listings page.</p>
      </div>
    </div>
  );
};

export default MyListings;
