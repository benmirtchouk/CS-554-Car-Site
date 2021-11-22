import React from 'react';
import '../../App.css';
import '../../Carigs.css';
import SideBar from '../sidebars/SideBar.js';

const MyListings = () => {
  const slinks = [
    { name:"Sell A Car", link:"/sell_car" },
    { name:"Recent Sales", link:"/recent_sales" },
    { name:"Sellers", link:"/sellers" },
  ];

  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
        <div className="mainbody">
	   <h1>My Listings</h1>
           <br /><br />
           <p>
              This is the My Listings page.
           </p>
        </div>
    </div>
  );
};

export default MyListings;
