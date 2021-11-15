import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../../Carigs.css';
import Search from './Search';

const Kelly = () => {
  return ( 
    <div className="sidenav">
       <nav>
          <Link to="/">Home</Link>
          <Link to="/safety">Safety</Link>
          <Link to="/dot">DOT</Link>
	  <Search />
       </nav>
    </div>
  )
}
export default Kelly;
