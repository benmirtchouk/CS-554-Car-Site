import React from 'react';
import '../../App.css';
import '../../Carigs.css';
import SideBar from '../sidebars/SideBar.js';

const FindByMake = () => {
  const slinks = [
    { name: "Find by Model", link: "/find_by_model" },
    { name: "Find by Year", link: "/find_by_year" },
    { name: "Find by Vin", link: "/find_by_vin" },
  ];
  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
      <div className="mainbody">
        <h1>Find Car by Make</h1>
        <br /><br />
        <p>
          This is the Find Car by Make page.
        </p>
      </div>
    </div>
  );
};

export default FindByMake;
