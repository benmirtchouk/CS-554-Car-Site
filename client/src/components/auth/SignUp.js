import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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
  const [formDisplayName, setFormDisplayName] = useState(undefined);

  // const slinks = [
  //   {
  //     name: "Home",
  //     link: "/",
  //   },
  // ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPwMatch("");
    const { email, firstPwd, secondPwd, displayName } = e.target.elements;
    setFormDisplayName(displayName.value);

    if (firstPwd.value !== secondPwd.value) {
      setPwMatch("Passwords do not match");
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(email.value, firstPwd.value, displayName.value);
    } catch (e) {
      console.log(`${e}`);
      alert(e);
      return false;
    }

    return true;
  };

  const doCreateAccount = async (displayName) => {
    try {
      await createAccount(displayName);
    } catch (e) {
      console.log('unexpected error', e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const currDisplayName = currentUser.displayName ?? formDisplayName;
      doCreateAccount(currDisplayName);
    }
  }, [currentUser]);

  if (currentUser) {
    return <Redirect to="/account" />;
  }

  const handleButtonClick = async (provider) => {
    console.log(`about to call logInSocialMedia`);
    await doSocialSignIn(provider)
      .catch((e) => {
        console.log(`${e}`);
        alert(e.message);
      });
  };

  return (
    <div className="max-w-md mx-auto text-left p-4">
      <h1 className="-mb-2 mt-2">Sign Up</h1>
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
            title="Email address"
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
	  <Form.Label>Display Name</Form.Label>
	    <Form.Control
              placeholder="Enter Display Name"
              id="displayName"
              name="displayName"
              className="form-control"
              type="input"
              title="Display Name"
            />
	</Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            name="firstPwd"
            className="form-control"
            title="Password"
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
            title="Confirm Password"
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
