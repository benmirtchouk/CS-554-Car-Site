import React from 'react';
import '../../App.css';
import '../../Carigs.css';
import SideBar from '../sidebars/SideBar.js';

const FindByVin= () => {
  const slinks = [
     { name: "Find by Model", link: "/find_by_model" },
     { name: "Find by Make", link: "/find_by_make" },
     { name: "Find by Year", link: "/find_by_year" },
  ];
  return (
    <div className="main_layout">
      <SideBar side_links={slinks}/>
        <div className="mainbody">
	   <h1>Find Car by Vin</h1>
           <br /><br />
           <p>
              This is the Find Car by Vin page.
           </p>
        </div>
    </div>
  );
};

export default FindByVin;
