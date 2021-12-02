import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { signUpUserWithEmailPassword } from "../firebase/Firebase";
import { AuthContext } from "../firebase/Auth";
import Sidebar from "../sidebars/Sidebar";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPwMatch("");
    const { displayName, email, phoneNumber, firstPwd, secondPwd } =
      e.target.elements;
    // console.log(`displayName: ${displayName.value}, email: ${email.value}`);
    if (firstPwd.value !== secondPwd.value) {
      setPwMatch("Passwords do not match");
      return false;
    }

    try {
      await signUpUserWithEmailPassword(
        email.value,
        firstPwd.value,
        displayName.value,
        phoneNumber.value
      );
      console.log("User was created successfully");
      history.push("/login");
    } catch (error) {
      console.log(`${error}`);
      alert(error);
    }

    return true;
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main_layout">
      <Sidebar side_links={slinks} />
      <div className="mainbody">
        <h1>Register New User</h1>
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <form className="RegisterForm" onSubmit={handleSubmit}>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="displayName">
              Name:
            </label>
            <input
              name="displayName"
              className="form-control"
              placeholder="enter name"
              type="text"
            />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="email">
              Email:
            </label>
            <input
              name="email"
              className="form-control"
              placeholder="enter email address"
              type="email"
            />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="phone">
              Phone Number:
            </label>
            <input
              name="phoneNumber"
              className="form-control"
              placeholder="enter phone number"
              type="tel"
            />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="firstPwd">
              Password:
            </label>
            <input
              name="firstPwd"
              className="form-control"
              placeholder="password"
              type="password"
            />
          </div>
          <div className="form-group input-group">
            <label className="reglabel" htmlFor="secondPwd">
              Confirm Password:
            </label>
            <input
              name="secondPwd"
              className="form-control"
              placeholder="confirm password"
              type="password"
            />
          </div>

          <div className="form-group">
            <button
              id="submitBtn"
              type="submit"
              name="submitBtn"
              className="login-btn btn-block"
            >
              {" "}
              Register{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
