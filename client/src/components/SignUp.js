import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {signUpUserWithEmailPassword} from './firebase/Firebase';
import { AuthContext } from './firebase/Auth';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/SideBar.js';

const SignUp = () => {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');

  const slinks = [{
    name: "Home", link: "/",
  }];



  const handleSubmit = async (e) => {
    e.preventDefault();
    const {displayName, email, firstPwd, secondPwd } = e.target.elements;
    console.log(`displayName: ${displayName.value}, email: ${email.value}, firstPwd: ${firstPwd.value}, secondPwd: ${secondPwd.value}`);
    if (firstPwd.value !== secondPwd.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
        await signUpUserWithEmailPassword(email.value, firstPwd.value, displayName);
	console.log(`User was created successfully`);
    }
    catch(e) {
      console.log(`${e}`);
      alert(e);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main_layout">
      <SideBar side_links={slinks}/>
        <div className="mainbody">
	   <h1>Register New User</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <div className="form-group input-group">
         <label className="reglabel" for="displayName">Display Name:</label>
	 <input name="displayName" className="form-control" placeholder="Display Name" type="text" />
	</div>
	<div className="form-group input-group">
          <label className="reglabel" for="email">Email:</label>
	  <input name="email" className="form-control" placeholder="Email address" type="email" />
	</div> 
	<div className="form-group input-group">
          <label className="reglabel" for="firstName">First Name:</label>
	  <input name="firstName" className="form-control" placeholder="First Name" type="text" />
	</div> 
	<div className="form-group input-group">
          <label className="reglabel" for="lastName">Last Name:</label>
	  <input name="lastName" className="form-control" placeholder="Last Name" type="text" />
	</div> 
	<div className="form-group input-group">
          <label className="reglabel" for="firstPwd">Password:</label>
	  <input name="firstPwd" className="form-control" placeholder="password" type="password" />
	</div> 
	<div className="form-group input-group">
          <label className="reglabel" for="secondPwd">Confirm Password:</label>
	  <input name="secondPwd" className="form-control" placeholder="confirm password" type="password" />
	</div> 


	<div className="form-group">
	   <button id="submitBtn" type="submit" name="submitBtn" className="login-btn btn-block"> Register </button>
	</div> 
      </form>
     </div>
    </div>
  );
};

export default SignUp;
