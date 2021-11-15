import React from 'react';
import './App.css';
import './Carigs.css';

const NavBar = () => {
   return (
	   <nav id="top-navbar" class="navbar navbar-expand-sm fixed-top">
	     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">More</button>
             <a className="navbar-brand" href="#">Carigslist</a>
	     <div class="collapse navbar-collapse" id="navbarItems">
	     <ul class="navbar-nav">
	        <li className="nav-item">
        	  <a className="nav-link" href="/">Home</a>
        	</li>
        	<li className="nav-item">
        	  <a className="nav-link" href="/seller">Selling</a>
        	</li>
        	<li className="nav-item">
        	  <a className="nav-link" href="/message_board">Messaging</a>
        	</li>
	        <li className="nav-item dropdown">
	           <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Analytics</a>
	         <div className="dropdown-menu dropdown-menu-right">
        	  <a className="nav-link1" href="/kelly">Kelly</a>
	          <br />
        	  <a className="nav-link1" href="/safety">Safety</a>
	          <br />
        	  <a className="nav-link1" href="/dot">DOT</a>
	         </div>
	        </li>
	        <li className="nav-item dropdown">
	           <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Account Info</a>
	         <div className="dropdown-menu dropdown-menu-right">
        	  <a className="nav-link1" href="/login">Login</a>
	          <br />
        	  <a className="nav-link1" href="/signup">SignUp</a>
	         </div>
	        </li>
       </ul>
       </div>
       </nav>
   );
};
export default NavBar;
