import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/Seller.js';

const Seller = () => {
  return (
    <div class="main_layout">
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
