import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../../Carigs.css';
import Search from './Search';

const DOT = () => {
  return ( 
    <div className="sidenav">
       <nav>
          <Link to="/">Home</Link>
          <Link to="/kelly">Kelly</Link>
          <Link to="/safety">Safety</Link>
	  <Search />
       </nav>
    </div>
  )
}
export default DOT;
