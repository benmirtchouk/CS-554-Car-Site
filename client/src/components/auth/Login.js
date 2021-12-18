import React, { useContext, useState } from "react"; // useContext
import { Link, Redirect, useHistory } from "react-router-dom";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../firebase/Auth";
import {
  doSignInWithEmailAndPassword,
  doSocialSignIn,
} from "../../firebase/FirebaseFunctions";

const Login = () => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const handleResetPwd = async (e) => {
    history.push("/reset_pwd");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = e.target.elements;
    await doSignInWithEmailAndPassword(email.value, password.value)
      .then(async (res) => {
        setError(false);
        setErrorMsg("");
        //history.push("/");
        history.goBack();
      })
      .catch((e) => {
        setError(true);
        //setErrorMsg(e.message);
        console.log(`${e.message}`);
        setErrorMsg(`Email/Password Invalid`);
      });
  };

  if (currentUser) return <Redirect to="/" />;

  const handleButtonClick = async (provider) => {
    await doSocialSignIn(provider)
      .then(async () => {
        history.goBack();
      })
      .catch((e) => {
        console.log(`${e}`);
        alert(e.message);
      });
  };

  return (
    <div className="form-page">
      <h1 className="-mb-2 mt-2">Login</h1>
      {error && <p className="LoginError">{errorMsg}</p>}
      <div className="space-x-2 pt-4 pb-2">
        <Button
          type="button"
          className="button-icon"
          onClick={() => handleButtonClick("google")}
        >
          <IoLogoGoogle />
          Login with Google
        </Button>
        <Button
          type="button"
          className="button-icon"
          onClick={() => handleButtonClick("facebook")}
        >
          <IoLogoFacebook />
          Login with Facebook
        </Button>
      </div>
      <hr />
      <p className=" signup-or relative text-center text-gray-400 bg-white mt-2 -mb-6 italic">
        or
      </p>
      <Form onSubmit={handleFormSubmit} className="mb-2">
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter email"
            id="email"
            name="email"
            className="form-control"
            type="email"
          />
          <Form.Text className="text-muted">
            We'll{" "}
            <span className="line-through">
              never share your email with anyone
            </span>{" "}
            directly share everything you give us with Mark Zuckerberg.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button
          className="ml-2"
          onClick={handleResetPwd}
          variant="danger"
          type="btn"
        >
          Reset My Password
        </Button>
      </Form>
      {/* <form className="LoginForm" onSubmit={handleFormSubmit}>
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
      </form> */}
      <Link to="/signup" className="pt-2">
        New here? Register!
      </Link>
    </div>
  );
};

export default Login;
