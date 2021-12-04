import React from 'react';
import '../../App.css';
import '../../Carigs.css';
import SideBar from '../sidebars/SideBar.js';

const Sellers = () => {
  const slinks = [
    { name: "List A Car", link: "/sell_car" },
    { name: "My Listings", link: "/my_listings" },
    { name: "Recent Sales", link: "/recent_sales" },
    { name: "Messaging", link: "/message_board" },
  ];
  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
      <div className="mainbody">
        <h1>Sellers</h1>
        <br /><br />
        <p>
          This is the Sellers page.
        </p>
      </div>
    </div>
  );
};

export default Sellers;
