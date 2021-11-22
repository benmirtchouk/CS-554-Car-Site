import React from 'react';
import '../../App.css';
import '../../Carigs.css';
import SideBar from '../sidebars/SideBar.js';

const MessageBoard = () => {
  const slinks = [
    { name: "Sellers", link: "/sellers" },
    { name: "Recent Sales", link: "/recent_sales" },
  ];
  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
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
