import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from './firebase/Auth';
import {logInEmailPassword, logInSocialMedia} from './firebase/Firebase';
import '../App.css';
import '../Carigs.css';

const Login = () => {
  const history = useHistory();

  const handleFormSubmit = async (e) => {
   e.preventDefault();
   let {email, password} = e.target.elements;
   try {
    await logInEmailPassword(email.value, password.value);
   }
   catch(e) {
    console.log(`${e}`);
    alert(e.message);
   }
   alert(`login submitted`);
   //history.push("/");
   history.goBack()
  };

  const handleButtonClick = async (provider) => {
   try {
      await logInSocialMedia(provider);
   }
   catch(e) {
    console.log(`${e}`);
    alert(e.message);
   }
  };

  return (
    <div className="main_layout">
      <div className="mainbody">
	<h1>Login</h1>
          <br /><br />

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
      <br />
       <button type="button" onClick={()=>handleButtonClick('google')}>Google</button>
       <button type="button" onClick={()=>handleButtonClick('facebook')}>Facebook</button>
        </div>
    </div>
  );
};

export default Login;
