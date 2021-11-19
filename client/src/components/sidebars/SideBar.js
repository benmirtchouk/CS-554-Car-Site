import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../../Carigs.css';
import Search from './Search';

const SideBar = (props) => {
  return ( 
    <div className="sidenav">
       <nav>
	  { props.side_links.map(item => 
              <Link key={item.name} to={item.link}>{item.name}</Link>) }
	  <Search />
       </nav>
    </div>
  )
}
export default SideBar;
