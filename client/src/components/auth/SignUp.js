import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import { doCreateUserWithEmailAndPassword } from '../../firebase/FirebaseFunctions';
import { AuthContext } from '../../firebase/Auth';

const SignUp = () => {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  const history = useHistory();

  const slinks = [
    {
      name: "Home",
      link: "/",
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPwMatch('');
    const { displayName, email, phoneNumber, firstPwd, secondPwd } = e.target.elements;
    //console.log(`displayName: ${displayName.value}, email: ${email.value}`);
    if (firstPwd.value !== secondPwd.value) {
      setPwMatch("Passwords do not match");
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(email.value, firstPwd.value, displayName.value, phoneNumber.value);
      console.log(`User was created successfully`);
      history.push("/login");
    } catch (e) {
      console.log(`${e}`);
      alert(e);
    }

    return true;
  };

  if (currentUser) return <Redirect to="/" />;

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
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            placeholder="Enter name"
            id="displayName"
            name="displayName"
            className="form-control"
            type="text"
          />
        </Form.Group>
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
            We'll{" "}
            <span className="line-through">
              never share your email with anyone
            </span>{" "}
            directly share everything you give us with Mark Zuckerberg.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            placeholder="Enter phone number"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            type="tel"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            name="firstPwd"
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            id="password"
            name="secondPwd"
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    {/* <div className="main_layout">
      <SideBar side_links={slinks} />
      <div className="mainbody">
        <h1>Register New User</h1>
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <form className="RegisterForm" onSubmit={handleSubmit}>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="displayName">Name:</label>
            <input name="displayName" className="form-control" placeholder="enter name" type="text" />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="email">Email:</label>
            <input name="email" className="form-control" placeholder="enter email address" type="email" />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="phone">Phone Number:</label>
            <input name="phoneNumber" className="form-control" placeholder="enter phone number" type="tel" />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="firstPwd">Password:</label>
            <input name="firstPwd" className="form-control" placeholder="password" type="password" />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="secondPwd">Confirm Password:</label>
            <input name="secondPwd" className="form-control" placeholder="confirm password" type="password" />
          </div>

          <div className="form-group">
            <button id="submitBtn" type="submit" name="submitBtn" className="login-btn btn-block"> Register </button>
          </div>
        </form>
      </div> */}
    </div>
    // <div className="main_layout">
    //   <Sidebar side_links={slinks} />
    //   <div className="mainbody">
    //     <h1>Register New User</h1>
    //     {pwMatch && <h4 className="error">{pwMatch}</h4>}
    //     <form className="RegisterForm" onSubmit={handleSubmit}>
    //       <div className="form-group input-group">
    //         <label className="reglabel" htmlFor="displayName">
    //           Name:
    //         </label>
    //         <input
    //           name="displayName"
    //           className="form-control"
    //           placeholder="enter name"
    //           type="text"
    //         />
    //       </div>
    //       <div className="form-group input-group">
    //         <label className="reglabel" htmlFor="email">
    //           Email:
    //         </label>
    //         <input
    //           name="email"
    //           className="form-control"
    //           placeholder="enter email address"
    //           type="email"
    //         />
    //       </div>
    //       <div className="form-group input-group">
    //         <label className="reglabel" htmlFor="phone">
    //           Phone Number:
    //         </label>
    //         <input
    //           name="phoneNumber"
    //           className="form-control"
    //           placeholder="enter phone number"
    //           type="tel"
    //         />
    //       </div>
    //       <div className="form-group input-group">
    //         <label className="reglabel" htmlFor="firstPwd">
    //           Password:
    //         </label>
    //         <input
    //           name="firstPwd"
    //           className="form-control"
    //           placeholder="password"
    //           type="password"
    //         />
    //       </div>
    //       <div className="form-group input-group">
    //         <label className="reglabel" htmlFor="secondPwd">
    //           Confirm Password:
    //         </label>
    //         <input
    //           name="secondPwd"
    //           className="form-control"
    //           placeholder="confirm password"
    //           type="password"
    //         />
    //       </div>

    //       <div className="form-group">
    //         <button
    //           id="submitBtn"
    //           type="submit"
    //           name="submitBtn"
    //           className="login-btn btn-block"
    //         >
    //           {" "}
    //           Register{" "}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default SignUp;
