import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/SideBar.js';

  const DOT = () => {
  const slinks = [ 
    { name: "Kelly", link: "/kelly" },
    { name: "Safety", link: "/safety" },
  ];

  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
        <div className="mainbody">
	   <h1>Department Of Transportation (DOT)</h1>
           <br /><br />
           <p>
              This is the DOT page.
           </p>
        </div>
    </div>
  );
};

export default DOT;
