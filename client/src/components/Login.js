import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/Login.js';

const Login = () => {
  return (
    <div class="main_layout">
      <SideBar />
        <div className="mainbody">
	   <h1>Login</h1>
           <br /><br />
           <p>
              This is the login page.
           </p>
        </div>
    </div>
  );
};

export default Login;
