import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../../Carigs.css';
import Search from './Search';

const Home = () => {
  return ( 
    <div className="sidenav">
       <nav>
          <Link to="/">Home</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/seller">Seller</Link>
          <Link to="/kelly">Kelly</Link>
          <Link to="/dot">DOT</Link>
          <Link to="/message_board">Messaging</Link>
	  <Search />
       </nav>
    </div>
  )
}
export default Home;
