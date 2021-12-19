import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../firebase/Auth";
import { doPasswordReset } from "../../firebase/FirebaseFunctions";
import "../../Carigs.css";

const PasswordReset = () => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // can't reset password if you are already logged in
  if (currentUser && currentUser.email) history.push("/");

  const handlePwdResetSubmit = async (e) => {
    e.preventDefault();
    try {
      await doPasswordReset(e.target.email.value);
      setError(false);
      setErrorMessage("");
      alert(`Your request request is being processed`);
      history.goBack();
    } catch (e1) {
      console.log(`Password Reset error: ${e1}`);
      setError(true);
      setErrorMessage(`${e1}`);
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-md mx-auto text-left p-4">
      <h1 className="-mb-2 mt-2">Password Reset </h1>
      <hr className="mt-2" />
      {error && <p className="error">{errorMessage}</p>}
      <Form onSubmit={handlePwdResetSubmit} className="mb-2">
        <div className="row">
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Email address</Form.Label>
            <Form.Control
              placeholder="Enter email"
              title="Enter Email"
              id="email"
              size="sm"
              name="email"
              className="form-control mb-5"
              type="email"
              required
            />
            <p className="mb-1 text-center italic">
              Click submit to reset your password
            </p>
            <p className="mt-1 text-center italic">
              If the email is a subscribed user, a reset email will be sent to
              the above email
            </p>
            <div className="col text-center">
              <Button variant="primary" type="submit">
                Click to reset your current password
              </Button>
            </div>
          </Form.Group>
        </div>
      </Form>
    </div>
  );
};

export default PasswordReset;
