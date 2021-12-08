import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../firebase/Auth";

const Account = () => {
  const { currentUser } = useContext(AuthContext);
  const [editForm, setEditForm] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  if (
    currentUser &&
    currentUser.displayName &&
    currentUser.displayName !== displayName
  )
    setDisplayName(currentUser.displayName);

  if (currentUser && currentUser.email && currentUser.email !== email)
    setEmail(currentUser.email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setEditForm(!editForm);
    return true;
  };

  const handleEditButtonClick = async () => {
    setEditForm(!editForm);
  };

  // console.log(currentUser);
  return (
    <div className="max-w-md mx-auto text-left p-4">
      <h1 className="-mb-2 mt-2">Account Profile</h1>
      {!editForm && (
        <div className="space-x-1 pt-4 pb-2">
          <Button
            type="button"
            className="button-icon"
            onClick={() => handleEditButtonClick()}
          >
            Edit
          </Button>
        </div>
      )}
      <hr />
      {!editForm && (
        <div>
          <div className="row">
            <div className="col">
              <p>
                <span>First Name:</span>
              </p>
            </div>
            <div className="col">
              <p>
                <span>Last Name:</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span>Display Name:</span>
                {displayName}
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <p>
                <span>Email address:</span>
                {email}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span>Phone Number:</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <p>
                <span>Street Address:</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span>Street Address 2:</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span>City:</span>
              </p>
            </div>
            <div className="col">
              <p>
                <span>State:</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span>Zip Code:</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {editForm && (
        <Form onSubmit={handleFormSubmit} className="mb-2">
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First Name"
                  id="firstName"
                  size="sm"
                  name="firstName"
                  className="form-control"
                  type="text"
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="First Name"
                  id="lastName"
                  size="sm"
                  name="lastName"
                  className="form-control"
                  type="text"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  id="displayName"
                  size="sm"
                  name="displayName"
                  defaultValue={displayName}
                  className="form-control"
                  type="text"
                />
              </Form.Group>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  id="email"
                  size="sm"
                  name="email"
                  defaultValue={email}
                  className="form-control"
                  type="email"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  placeholder="Enter phone number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  size="sm"
                  type="tel"
                />
              </Form.Group>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  placeholder="Enter Street Address 1"
                  id="address1"
                  name="address1"
                  className="form-control"
                  size="sm"
                  type="text"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Street Address 2</Form.Label>
                <Form.Control
                  placeholder="Enter Street Address 2"
                  id="address2"
                  name="address2"
                  className="form-control"
                  size="sm"
                  type="text"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="City"
                  id="city"
                  name="city"
                  className="form-control"
                  size="sm"
                  type="text"
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  placeholder="State"
                  id="state"
                  name="state"
                  className="form-control"
                  size="sm"
                  type="text"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  placeholder="Zip Code"
                  id="zipCode"
                  name="zipCode"
                  className="form-control"
                  size="sm"
                  type="text"
                />
              </Form.Group>
            </div>
          </div>
          <hr />
          <Form.Group>
            <Form.Text className="text-muted">
              Password must be entered to make updates
            </Form.Text>
          </Form.Group>
          <br />
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="firstPwd"
                  className="form-control"
	          required
                />
                <Form.Label className="ml-5">Password</Form.Label>
              </Form.Group>
            </div>
            <div className="col">
              <Button className="ml-5" variant="primary" type="submit">
                Submit Changes
              </Button>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Account;
