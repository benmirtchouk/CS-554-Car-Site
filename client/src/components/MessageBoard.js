import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/MessageBoard.js';

const MessageBoard = () => {
  return (
    <div className="main_layout">
      <SideBar />
        <div className="mainbody">
	   <h1>MessageBoard</h1>
           <br /><br />
           <p>
              This is the MessageBoard page.
           </p>
        </div>
    </div>
  );
};

export default MessageBoard;
