import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/SideBar.js';

const RecentSales = () => {
  const slinks = [{name:"Sellers", link:"/sellers"}];
  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
        <div className="mainbody">
	   <h1>Recent Sales</h1>
           <br /><br />
           <p>
              This is the Recent Sales page.
           </p>
        </div>
    </div>
  );
};

export default RecentSales;
