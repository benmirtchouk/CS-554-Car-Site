import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/Kelly.js';

const Kelly = () => {
  return (
    <div className="main_layout">
      <SideBar />
        <div className="mainbody">
	   <h1>Kelly Bluebook Values</h1>
           <br /><br />
           <p>
              This is the Kelly page.
           </p>
        </div>
    </div>
  );
};

export default Kelly;
