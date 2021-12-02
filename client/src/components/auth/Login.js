import React, { useState } from "react"; // useContext
import { Link, useHistory } from "react-router-dom";
// import { AuthContext } from "../firebase/Auth";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
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
    <div className="max-w-sm mx-auto text-left">
      <h1 className="-mb-2 mt-2">Login</h1>
      {error && <p className="LoginError">{errorMsg}</p>}
      <div className="space-x-2 py-4">
        <Button type="button" className="button-icon" onClick={() => handleButtonClick("google")}>
          <IoLogoGoogle />
          Login with Google
        </Button>
        <Button type="button" className="button-icon" onClick={() => handleButtonClick("facebook")}>
          <IoLogoFacebook />
          Login with Facebook
        </Button>
      </div>
      <Form onSubmit={handleFormSubmit} className="mb-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter email"
            id="email"
            name="email"
            className="form-control"
            type="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
