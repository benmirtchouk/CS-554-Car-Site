import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/DOT.js';

const DOT = () => {
  return (
    <div className="main_layout">
      <SideBar />
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
