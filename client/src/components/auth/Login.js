import React, { useState } from "react"; // useContext
import { Link, useHistory } from "react-router-dom";
// import { AuthContext } from "../firebase/Auth";
import { logInEmailPassword, logInSocialMedia } from "../firebase/Firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    await logInEmailPassword(email.value, password.value)
      .then(() => {
        setError(false);
        setErrorMsg("");
        // history.push("/");
        history.goBack();
      })
      .catch(() => {
        setError(true);
        // setErrorMsg(e.message);
        console.log(`${e.message}`);
        setErrorMsg("Email/Password Invalid");
      });
  };

  const handleButtonClick = async (provider) => {
    await logInSocialMedia(provider)
      .then(() => {
        history.goBack();
      })
      .catch((e) => {
        console.log(`${e}`);
        alert(e.message);
      });
  };

  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>Login</h1>
        <form className="LoginForm" onSubmit={handleFormSubmit}>
          <div className="form-group input-group">
            <label className="loginlabel" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              name="email"
              className="form-control"
              placeholder="enter email address"
              type="email"
            />
          </div>
          <div className="form-group input-group">
            <label className="loginlabel" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              name="password"
              className="form-control"
              placeholder="password"
              type="password"
            />
          </div>
          {error && <p className="LoginError">{errorMsg}</p>}
          <div className="form-group">
            <button
              className="login-btn btn-block"
              type="submit"
              name="submitBtn"
            >
              {" "}
              Log In{" "}
            </button>
          </div>
        </form>
        <Link to="/signup" className="">
          Register as a New User
        </Link>
        <hr />
        <button
          className="login-btn mt-20 ml-2"
          type="button"
          onClick={() => handleButtonClick("google")}
        >
          Login via Google
        </button>
        <button
          className="login-btn ml-2"
          type="button"
          onClick={() => handleButtonClick("facebook")}
        >
          Login via Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
