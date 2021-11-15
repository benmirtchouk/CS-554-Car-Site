import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../../Carigs.css';
import Search from './Search';

const Account = () => {
  return ( 
    <div className="sidenav">
       <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
	  <Search />
       </nav>
    </div>
  )
}
export default Account;
