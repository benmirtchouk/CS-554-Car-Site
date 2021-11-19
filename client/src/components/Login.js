import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {logInEmailPassword, logInSocialMedia} from './firebase/Firebase';
import '../App.css';
import '../Carigs.css';

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const handleFormSubmit = async (e) => {
   e.preventDefault();
   let {email, password} = e.target.elements;
   try {
    await logInEmailPassword(email.value, password.value);
    alert(`login submitted`);
    //history.push("/");
    history.goBack()
   }
   catch(e) {
    alert(e.message);
    setError(true);
    setErrorMsg(e.message);
   }
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
        <form className="LoginForm" onSubmit={handleFormSubmit}>
        <div className="form-group input-group">
          <label className="loginlabel" for="email">Email:</label>
          <input id="email" name="email" className="form-control" placeholder="enter email address" type="email" />
        </div>
        <div className="form-group input-group">
          <label className="loginlabel" for="password">Password:</label>
          <input id="password" name="password" className="form-control" placeholder="password" type="enter password" />
        </div>
	{error && <p className="LoginError">{errorMsg}</p>}
	<div className="form-group">
           <button className="login-btn btn-block" type="submit" name="submitBtn" > Log In </button>
	</div>
      </form>
	<Link to="/signup" className="">Register as a New User</Link>
      <hr />
       <button className="login-btn mt-20 ml-2" type="button" onClick={()=>handleButtonClick('google')}>Login via Google</button>
       <button className="login-btn ml-2" type="button" onClick={()=>handleButtonClick('facebook')}>Login via Facebook</button>
        </div>
    </div>
  );
};

export default Login;
