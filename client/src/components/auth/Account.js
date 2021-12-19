import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../firebase/Auth";
import { getAccount, updateAccount } from "../../data/account";
import {
  doReAuthenticate,
  doPasswordUpdate,
} from "../../firebase/FirebaseFunctions";
import "../../Carigs.css";

const Account = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [dbAccount, setDBAccount] = useState(undefined);
  const [editForm, setEditForm] = useState(false);
  const [error, setError] = useState(false);
  const [gotAcctInfo, setGotAcctInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [passwdUpdate, setPasswdUpdate] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [prevFirstName, setPrevFirstName] = useState("");
  const [prevLastName, setPrevLastName] = useState("");
  const [prevDisplayName, setPrevDisplayName] = useState("");
  const [prevPhoneNumber, setPrevPhoneNumber] = useState("");
  const [prevAddress1, setPrevAddress1] = useState("");
  const [prevAddress2, setPrevAddress2] = useState("");
  const [prevCity, setPrevCity] = useState("");
  const [prevState, setPrevState] = useState("");
  const [prevZipCode, setPrevZipCode] = useState("");
  const states = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
  ];

  if (
    currentUser &&
    currentUser.displayName &&
    currentUser.displayName !== displayName
  ) {
    setDisplayName(currentUser.displayName);
    setPrevDisplayName(currentUser.displayName);
  }

  if (currentUser && currentUser.email && currentUser.email !== email)
    setEmail(currentUser.email);

  // get the data if the searchWord is presnt
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setGotAcctInfo(false);
        const { data, status } = await getAccount();
        if (status !== 200) {
          setError(true);
          setErrorMessage(status);
          setGotAcctInfo(false);
        } else {
          setDBAccount(data);
          if (data === null) {
            setGotAcctInfo(false);
          } else {
            setGotAcctInfo(true);
          }
        }
      } catch (e) {
        setError(true);
        setErrorMessage(`problem updating account`);
      }
      setLoading(false);
    }
    fetchData();
  }, [editForm, passwdUpdate]);

  useEffect(() => {
    if (dbAccount !== undefined && dbAccount !== null) {
      if (dbAccount.firstName !== null) {
        setFirstName(dbAccount.firstName);
        setPrevFirstName(dbAccount.firstName);
      }
      if (dbAccount.lastName !== null) {
        setLastName(dbAccount.lastName);
        setPrevLastName(dbAccount.lastName);
      }
      if (dbAccount.displayName !== null) {
        setDisplayName(dbAccount.displayName);
        setPrevDisplayName(dbAccount.displayName);
      }
      if (dbAccount.phoneNumber !== null) {
        setPhoneNumber(dbAccount.phoneNumber);
        setPrevPhoneNumber(dbAccount.phoneNumber);
      }
      if (dbAccount.address1 !== null) {
        setAddress1(dbAccount.address1);
        setPrevAddress1(dbAccount.address1);
      }
      if (dbAccount.address2 !== null) {
        setAddress2(dbAccount.address2);
        setPrevAddress2(dbAccount.address2);
      }
      if (dbAccount.city !== null) {
        setCity(dbAccount.city);
        setPrevCity(dbAccount.city);
      }
      if (dbAccount.state !== null) {
        setState(dbAccount.state);
        setPrevState(dbAccount.state);
      }
      if (dbAccount.zipCode !== null) {
        setZipCode(dbAccount.zipCode);
        setPrevZipCode(dbAccount.zipCode);
      }
    }
  }, [dbAccount]);

  const handlePwdChgSubmit = async (e) => {
    e.preventDefault();

    if (e.target.firstPwd.value !== e.target.secondPwd.value) {
      setError(true);
      setErrorMessage(`New Passwords do not match`);
      return false;
    }

    try {
      await doReAuthenticate(e.target.currentPwd.value);
      setError(false);
      setErrorMessage("");
    } catch (e3) {
      setError(true);
      setErrorMessage(`${e3}`);
      return false;
    }

    try {
      await doPasswordUpdate(e.target.firstPwd.value);
      setPasswdUpdate(false);
      setError(false);
      setErrorMessage("");
    } catch (e4) {
      console.log(`Password Update error: ${e4}`);
      setError(true);
      setErrorMessage(`${e4}`);
      return false;
    }
    return true;
  };

  const handleFormCancel = () => {
    setEditForm(!editForm);
    document.getElementById("firstName").value = prevFirstName;
    document.getElementById("lastName").value = prevLastName;
    document.getElementById("displayName").value = prevDisplayName;
    document.getElementById("phoneNumber").value = prevPhoneNumber;
    document.getElementById("address1").value = prevAddress1;
    document.getElementById("address2").value = prevAddress2;
    document.getElementById("city").value = prevCity;
    document.getElementById("state").value = prevState;
    document.getElementById("zipCode").value = prevZipCode;
  };

  const changePassword = () => {
    setPasswdUpdate(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // check that the password is correct for this email.
    try {
      await doReAuthenticate(e.target.password.value);
      setError(false);
      setErrorMessage("");
    } catch (e2) {
      console.log(`password is not correct for the given user`);
      setError(true);
      setErrorMessage(`${e2}`);
      return false;
    }

    const account = {
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      phoneNumber: phoneNumber,
      email: currentUser.email,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zipCode: zipCode,
    };
    try {
      // const {data, status} = await updateAccount(account);
      await updateAccount(account);
      setEditForm(!editForm);
      return true;
    } catch (e1) {
      setError(true);
      setErrorMessage(`problem updating account`);
      return false;
    }
  };

  const handleEditButtonClick = async () => {
    setEditForm(!editForm);
    setPasswdUpdate(false);
  };

  // console.log(currentUser);
  if (loading) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-left p-4">
      <h1 className="-mb-2 mt-2">Account Profile</h1>
      {!editForm && !passwdUpdate && (
        <div className="space-x-1 pt-4 pb-2">
          <Button
            type="button"
            className="button-icon"
            onClick={() => handleEditButtonClick()}
          >
            Edit
          </Button>
          <Button
            onClick={changePassword}
            className="ml-4"
            variant="danger"
            type="btn"
          >
            Change Password
          </Button>
        </div>
      )}
      <hr />
      {error && <p className="error">{errorMessage}</p>}
      {!editForm && !passwdUpdate && (
        <div>
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">First Name:</span>
                {gotAcctInfo && <span>{dbAccount.firstName}</span>}
              </p>
            </div>
            <div className="col">
              <p>
                <span className="detSum">Last Name:</span>
                {gotAcctInfo && <span>{dbAccount.lastName}</span>}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">Display Name:</span>
                {gotAcctInfo && <span>{dbAccount.displayName}</span>}
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">Email:</span>
                {currentUser.email && <span>{currentUser.email}</span>}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">Phone Number:</span>
                {gotAcctInfo && <span>{dbAccount.phoneNumber}</span>}
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">Street Address (1):</span>
                {gotAcctInfo && <span>{dbAccount.address1}</span>}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">Street Address (2):</span>
                {gotAcctInfo && <span>{dbAccount.address2}</span>}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">City:</span>
                {gotAcctInfo && <span>{dbAccount.city}</span>}
              </p>
            </div>
            <div className="col">
              <p>
                <span className="detSum">State:</span>
                {gotAcctInfo && <span>{dbAccount.state}</span>}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <span className="detSum">Zip Code:</span>
                {gotAcctInfo && <span>{dbAccount.zipCode}</span>}
              </p>
            </div>
          </div>
        </div>
      )}

      {!editForm && passwdUpdate && (
        <div className="max-w-md mx-auto text-left p-4">
          <h2 className="mb-0 mt-2">Password Update</h2>
          <hr className="mt-0" />
          <Form onSubmit={handlePwdChgSubmit} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current Password"
                id="currentPwd"
                name="currentPwd"
                className="form-control"
                title="Current Password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="firstPwd"
                name="firstPwd"
                className="form-control"
                title="New Password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                id="secondPwd"
                name="secondPwd"
                className="form-control"
                title="Confirm New Password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}

      {editForm && !passwdUpdate && (
        <Form onSubmit={handleFormSubmit} className="mb-2">
          <Form.Group>
            <Form.Text className="ml-3 italic text-muted">
              Password must be entered to make updates
            </Form.Text>
          </Form.Group>
          <div className="row mt-3">
            <div className="col">
              <Form.Group className="mb-0">
                <Form.Control
                  type="password"
                  placeholder="enter to submit"
                  id="password"
                  name="firstPwd"
                  className="form-control"
                  title="Password"
                  required
                />
                <Form.Label className="ml-4">Password</Form.Label>
              </Form.Group>
              <br />
            </div>
            <div className="col">
              <Button className="ml-0" variant="primary" type="submit">
                Submit
              </Button>
              <Button
                onClick={handleFormCancel}
                className="ml-4"
                variant="danger"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </div>
          <p className="text-center mb-0 mt-0">Account Data</p>
          <hr className="mt-0" />
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
                  value={firstName}
                  title="First Name"
                  onChange={(e) => {
                    if (e.target.value === null) setFirstName("");
                    else setFirstName(e.target.value);
                  }}
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
                  value={lastName}
                  title="Last Name"
                  onChange={(e) => {
                    if (e.target.value === null) setLastName("");
                    else setLastName(e.target.value);
                  }}
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
                  value={displayName}
                  className="form-control"
                  type="text"
                  title="Display Name"
                  onChange={(e) => {
                    if (e.target.value === null) setDisplayName("");
                    else setDisplayName(e.target.value);
                  }}
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
                  disabled
                  placeholder="Enter email"
                  id="email"
                  size="sm"
                  name="email"
                  value={email}
                  className="form-control"
                  type="email"
                  title="Email address"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Phone number (xxx-xxx-xxxx)</Form.Label>
                <Form.Control
                  placeholder="Enter phone number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  size="sm"
                  value={phoneNumber}
                  pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}[0-9]{4}"
                  type="tel"
                  title="Phone number"
                  onChange={(e) => {
                    if (e.target.value === null) setPhoneNumber("");
                    else setPhoneNumber(e.target.value);
                  }}
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
                  value={address1}
                  title="Street Address"
                  onChange={(e) => {
                    if (e.target.value === null) setAddress1("");
                    else setAddress1(e.target.value);
                  }}
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
                  value={address2}
                  title="Street Address 2"
                  onChange={(e) => {
                    if (e.target.value === null) setAddress2("");
                    else setAddress2(e.target.value);
                  }}
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
                  value={city}
                  title="City"
                  onChange={(e) => {
                    if (e.target.value === null) setCity("");
                    else setCity(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Select
                  className="form-control"
                  type="custom-select"
                  size="sm "
                  name="state"
                  id="state"
                  title="State"
                  onChange={(e) => {
                    if (e.target.value === null) setState("");
                    else setState(e.target.value);
                  }}
                >
                  <option selected>Open this select menu</option>
                  <option value="">Blank</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Zip Code (5 digits)</Form.Label>
                <Form.Control
                  placeholder="Zip Code"
                  id="zipCode"
                  name="zipCode"
                  className="form-control"
                  size="sm"
                  type="text"
                  pattern="[0-9]{5}"
                  value={zipCode}
                  title="Zip Code"
                  onChange={(e) => {
                    if (e.target.value === null) setZipCode("");
                    else setZipCode(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Account;
