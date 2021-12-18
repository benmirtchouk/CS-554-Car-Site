const express = require("express");
const mongo = require("mongodb");
const router = express.Router();
const Account = require("../src/DataModel/Account/Account");
const {
  ValidateId,
  ValidationError,
  validateNonBlankString,
} = require("../src/DataModel/Validation/ObjectProperties");
const {
  createAccount,
  getAccount,
  updateAccount,
} = require("../src/MongoOperations/account");
const {
  KeyDoesNotExist,
  KeyAlreadyExists,
} = require("../src/MongoOperations/OperationErrors");

/**
 * GET /account/:id
 * retrieve the user account
 * Params: none
 *   id: user id
 *   the user id can be found in req.currentUser
 * Return codes: 400, 500
 */
router.get("/", async (req, res) => {
  const user = req.currentUser;
  console.log(user);
  // if (!req.params.id)
  // return res.status(401).json({message: "UserId is a required parameter"} )

  // if (!user || req.params.id !== user.uid)
  // return res.status(401).json({message: "User must be authenticated to send request."} )

  /// Retrieve account from database
  try {
    const account = await getAccount(user.uid);
    return res.json(account);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


/**
 * GET /account/byId/:id
 * Retrieve the specified user account
 * Params: none
 *   id: user id
 * Return codes: 400, 500
 */
router.get("/by/:id", async(req, res) => {
  const id = req.params.id.trim();
  if(id.length === 0) {
    return res.status(400).message({message: "Id cannot be blank"});
  }


  try {
    const account = await getAccount(id);
    if(account == null) {
      return res.status(404).json({message: "User not found"})
    }
    return res.json(account);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
})

/**
 * PUT /account/:id
 * update the user account
 * Params:
 *      id: the user id can be found in req.currentUser
 *      displayName: user display name
 *      phoneNumber: user telephone number
 *      address1: First line of user street address
 *      address2: Second line of user street address
 *      city: user city
 *      state: user state
 *      zipCode: user zipcode
 *      firstName: user first name
 *      lastName: user last name
 *      photo: user photo, currently ignored
 *
 * Return codes: 400, 500
 */
router.put("/", async (req, res) => {
  const user = req.currentUser;
  let account = req.body;
  account._id = req.currentUser.uid;

  try {
    account._id = validateNonBlankString(account._id);
  } catch (e) {
    return res.status(400).json({ message: "Account id must be provided" });
  }

  if (account._id !== user.uid)
    return res.status(404).json({ message: `user must be authenticated` });

  try {
    account = new Account(account);
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ message: e.message });
    }
    console.error(e);
    return res.status(500).send();
  }

  /// Attempt to create a new account
  try {
    account = await updateAccount(account);
    //return res.json(account.asDictionary());
    return res.json(account);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * POST /account/:id
 * insert a new account (do on user login for the first time)
 * Params:
 *      _id: the user id can be found in req.currentUser
 *      displayName: user display name
 *      phoneNumber: user telephone number
 *      address1: First line of user street address
 *      address2: Second line of user street address
 *      city: user city
 *      state: user state
 *      zipCode: user zipcode
 *      firstName: user first name
 *      lastName: user last name
 *      photo: user photo, currently ignored
 *
 * Return codes: 400, 500
 */
router.post("/", async (req, res) => {
  const user = req.currentUser;
  if (!user)
    return res.status(401).json({ message: `user must be authenticated` });

  let account = { ...req.body, _id: user.uid };
  
  try {
    account = new Account(account);
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ message: e.message });
    }
    console.error(e);
    return res.status(500).send();
  }

  /// Attempt to create a new accout
  try {
    await createAccount(account);
    return res.json(account.asDictionary());
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
