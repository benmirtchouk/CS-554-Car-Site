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
	   <h1>SignUp</h1>
           <br /><br />
           <p>
              This is the SignUp page.
           </p>

      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              className="form-control"
              required
              name="displayName"
              type="text"
              placeholder="Name"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              id="firstPwd"
              name="firstPwd"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Confirm Password:
            <input
              className="form-control"
              name="secondPwd"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </label>
        </div>
        <button id="submitBtn" name="submitBtn" type="submit">
          Sign Up
        </button>
      </form>
      <br />
      <p> Put Social Sign In Here </p>
     </div>
    </div>
  );
};

export default SignUp;
