import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/Safety.js';

const Safety = () => {
  return (
    <div className="main_layout">
      <SideBar />
      <div className="mainbody">
           <h1>Safety</h1>
           <br /><br />
           <p>
              This is the Safety page.
           </p>
        </div>
    </div>
  );
};

export default Safety;
