import React, {useContext} from 'react';
import {AuthContext} from './firebase/Auth';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/LogOut.js';
import {logOut} from './firebase/Firebase.js';

const LogOut = () => {
  const {currentUser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    console.log(`about to signout`);
    logOut();

    console.log(`redirecting to login page`);
   }
   catch(e) {
    console.log(`${e}`);
    throw new Error(e);
   }
  };

  if (!currentUser) {
     return (
       <div className="main_layout">
         <SideBar />
           <div className="mainbody">
      	      <h1>LogOut</h1>
              <br /><br />
   	        <p>User is logged out</p>
           </div>
       </div>
     );
  }

  return (
    <div className="main_layout">
      <SideBar />
        <div className="mainbody">
	   <h1>LogOut</h1>
           <br /><br />
	  <button className="button" onClick={(handleSubmit)}>Sign Out</button>
        </div>
    </div>
  );
};

export default LogOut;
