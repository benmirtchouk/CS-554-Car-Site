import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../../Carigs.css';
import Search from './Search';

const Seller = () => {
  return ( 
    <div className="sidenav">
       <nav>
          <Link to="/">Home</Link>
	  <Search />
       </nav>
    </div>
  )
}
export default Seller;
