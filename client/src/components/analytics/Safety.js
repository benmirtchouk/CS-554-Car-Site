import React from 'react';
import '../../App.css';
import '../../Carigs.css';
import SideBar from '../sidebars/SideBar.js';

const Safety = () => {
  const slinks = [
    { name: "DOT", link: "/dot" },
    { name: "Kelly", link: "/kelly" },
  ];

  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
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
