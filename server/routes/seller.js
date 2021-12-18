const express = require("express");
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
  getAccounts,
} = require("../src/MongoOperations/account");
const {
    getAllSellers
} = require("../src/MongoOperations/listing");
const {
  KeyDoesNotExist,
  KeyAlreadyExists,
} = require("../src/MongoOperations/OperationErrors");
const PaginationRequest = require('../src/PaginationRequest');


router.get("/mostListed", async (req, res) => {
    let paginationRequest;
    try {
        paginationRequest = new PaginationRequest(req.query);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message});
    }

    const sellers = await getAllSellers(paginationRequest);
    const sellerIds = Object.keys(sellers)
    const accounts = (await getAccounts(sellerIds)).map(e => { return {...e, totalListings: sellers[e._id] }});
    /// Note: If the accounts collection ever stores sensitive information, this will need to be removed before being sent
    return res.json({
      sellers: accounts
    })
})

module.exports = router;