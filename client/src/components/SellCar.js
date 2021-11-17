import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/SideBar.js';

const SellCar = () => {
  const slinks = [
    {name:"Recent Sales", link:"/recent_sales"},
    {name:"My Listings", link:"/my_listings"},
  ];
  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
        <div className="mainbody">
	   <h1>List A Car</h1>
           <br /><br />
           <p>
              This is the List A Car page.
           </p>
        </div>
    </div>
  );
};

export default SellCar;
