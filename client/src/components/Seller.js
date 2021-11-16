import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/Seller.js';

const Seller = () => {
  return (
    <div className="main_layout">
      <SideBar />
        <div className="mainbody">
	   <h1>Seller Info</h1>
           <br /><br />
           <p>
              This is the Seller page.
           </p>
        </div>
    </div>
  );
};

export default Seller;
