import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from './components/firebase/Auth';
import {logOut} from './components/firebase/Firebase.js';
import './App.css';
import './Carigs.css';

const NavBar = () => {
  const {currentUser} = useContext(AuthContext);
  const [displayName, setDisplayName] = useState('');
  const history=useHistory();

  useEffect (()=> {
    if (currentUser && !currentUser.displayName)
       setDisplayName(currentUser.displayName);
  }, [currentUser]);

  if (currentUser)
  {
     if (currentUser.displayName)
        console.log(`NavBar: displayName: ${currentUser.displayName}`);
     else
        console.log(`NavBar: displayName: NULL`);
  }

  const handleLoginButtonClick = async (action) => {
      try {
	  switch (action) {
	    case "LogIn": 
	       history.push("/login");
               break;
	    case "LogOut": 
	       logOut();
	       history.push("/");
               break;
	    default: 
               alert (`unexpected action: ${action}`);
               break;
	  }
      }
      catch(e) {
         console.log(`${e}`);
	 alert(e.message);
      }
  };

  return (
	   <nav id="top-navbar" className="navbar navbar-expand-sm fixed-top">
	     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">More</button>
             <a className="navbar-brand" href="/">Carigslist</a>
	     <div className="collapse navbar-collapse" id="navbarItems">
	     <ul className="navbar-nav">
        	<li className="nav-item">
        	  <a className="nav-link" href="/sellers">Sellers</a>
        	</li>
	        <li className="nav-item dropdown">
	           <a className="nav-link dropdown-toggle" href="#search_cars" data-toggle="dropdown">Search Cars</a>
	         <div className="dropdown-menu dropdown-menu-right">
        	  <a className="nav-link1" href="/find_by_vin">Find By Vin</a>
	          <br />
        	  <a className="nav-link1" href="/find_by_make">Find By Make</a>
	          <br />
        	  <a className="nav-link1" href="/find_by_model">Find By Model</a>
	          <br />
        	  <a className="nav-link1" href="/find_by_year">Find By Year</a>
	         </div>
	        </li>
	        <li className="nav-item dropdown">
	           <a className="nav-link dropdown-toggle" href="#analytics_dd" data-toggle="dropdown">Analytics</a>
	         <div className="dropdown-menu dropdown-menu-right">
        	  <a className="nav-link1" href="/kelly">Kelly</a>
	          <br />
        	  <a className="nav-link1" href="/safety">Safety</a>
	          <br />
        	  <a className="nav-link1" href="/dot">DOT</a>
	         </div>
	        </li>
       </ul>
       </div>
       <div className="account_info">
	  {currentUser && <span className="userName">{currentUser.displayName}</span>}
	  {currentUser && <button type="button" onClick={()=>handleLoginButtonClick('LogOut')}>Logout</button>}
	  {!currentUser && <button type="button" onClick={()=>handleLoginButtonClick('LogIn')}>LogIn</button>}

       </div>
       </nav>
  );
};
export default NavBar;
