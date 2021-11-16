import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/Search.js';

const Search= () => {
  return (
    <div className="main_layout">
      <SideBar />
        <div className="mainbody">
           <br /><br />
           <p>
              This is the Search page.
           </p>
        </div>
    </div>
  );
};

export default Search;
