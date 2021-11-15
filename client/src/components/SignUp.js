import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/SignUp.js';

const SignUp = () => {
  return (
    <div class="main_layout">
      <SideBar />
        <div className="mainbody">
	   <h1>SignUp</h1>
           <br /><br />
           <p>
              This is the SignUp page.
           </p>
        </div>
    </div>
  );
};

export default SignUp;
