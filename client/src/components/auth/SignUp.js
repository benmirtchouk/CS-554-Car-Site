import React, { useContext, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import {
	  doCreateUserWithEmailAndPassword,
	  doSocialSignIn,
} from "../../firebase/FirebaseFunctions";
import { AuthContext } from "../../firebase/Auth";
import { createAccount } from "../../data/account";

const SignUp = () => {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  const history = useHistory();

  // const slinks = [
  //   {
  //     name: "Home",
  //     link: "/",
  //   },
  // ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPwMatch("");
    const { email, firstPwd, secondPwd } = e.target.elements;
    if (firstPwd.value !== secondPwd.value) {
      setPwMatch("Passwords do not match");
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(email.value, firstPwd.value);
    } catch (e) {
      console.log(`${e}`);
      alert(e);
      return false;
    }

    history.push("/account");
    //history.push("/login");
    return true;
  };

  const doCreateAccount = async () => {
    try {
      await createAccount();
    } catch (e) {
      console.log('unexpected error', e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      doCreateAccount();
    }
  }, [currentUser]);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleButtonClick = async (provider) => {
    console.log(`about to call logInSocialMedia`);
    await doSocialSignIn(provider)
      .then(async () => {
	console.log(`got back from async call`);
        history.push("/account");
        //history.goBack();
      })
      .catch((e) => {
        console.log(`${e}`);
        alert(e.message);
      });
  };

  return (
    <div className="max-w-md mx-auto text-left p-4">
      <h1 className="-mb-2 mt-2">Signup</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <div className="space-x-1 pt-4 pb-2">
        <Button
          type="button"
          className="button-icon"
          onClick={() => handleButtonClick("google")}
        >
          <IoLogoGoogle />
          Signup with Google
        </Button>
        <Button
          type="button"
          className="button-icon"
          onClick={() => handleButtonClick("facebook")}
        >
          <IoLogoFacebook />
          Signup with Facebook
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
            name="firstPwd"
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            id="passwordCnfrm"
            name="secondPwd"
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
