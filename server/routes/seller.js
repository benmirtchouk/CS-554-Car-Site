const express = require("express");
const router = express.Router();


const {
getAccounts,
  modifyRating,
} = require("../src/MongoOperations/account");
const {
    getAllSellers
} = require("../src/MongoOperations/listing");
const {

  UserDoesNotExist,
  InvalidOperation,
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


router.post("/:id/rate", async (req, res) => {
  const { rating, action } = req.body;
  const { id } = req.params;

  if(typeof id !== 'string' || id.length === 0) {
    return res.status(400).json({message: "id cannot be blank"})
  }
  const validRatings = new Set(["like", "dislike" ]);
  if(!validRatings.has(rating)) {
    return res.status(400).json({message: `${rating} is not a valid rating `})
  }

  const validActions = new Set(["add", "remove"]);
  if(!validActions.has(action)) {
    return res.status(400).json({message: `${action} is not a valid action`})
  }

  const negationScaler = action === "remove" ? -1 : 1;

  try {
    const updatedRatings = await modifyRating(id, rating, 1 * negationScaler);
    res.json({ratings: updatedRatings});
  } catch (e) {
    if(e instanceof UserDoesNotExist) {
      return res.status(404).json({message: "Seller not found"});
    } else if (e instanceof InvalidOperation) {
      return res.status(422).json({message: "No ratings of that type left to remove"});
    } else {
      console.error(e);
      return res.status(500).json({message: "Internal Server Error"});
    }
  }


})

module.exports = router;