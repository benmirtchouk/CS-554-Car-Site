const express = require("express");
const router = express.Router();


const {
getAccounts,
  modifyRating,
  getTopRated,
  addComment,
} = require("../src/MongoOperations/account");
const {
    getAllSellers
} = require("../src/MongoOperations/listing");
const {

  UserDoesNotExist,
  InvalidOperation,
} = require("../src/MongoOperations/OperationErrors");
const PaginationRequest = require('../src/PaginationRequest');
const SellerComment = require("../src/DataModel/Account/SellerComment");

const getAccountsFromAggregationResult = async (aggregationResults, aggregatedKey) => {
  const ids = Object.keys(aggregationResults);
  const accounts = (await getAccounts(ids)) 
                   .map(e => { return {...e, [aggregatedKey]: aggregationResults[e._id] } });
  
  /// Sort again, as merging the full account info can shuffle the array
  accounts.sort( (lhs, rhs) => lhs[aggregatedKey] < rhs[aggregatedKey] ? 1 : -1)
  /// Note: If the accounts collection ever stores sensitive information, this will need to be removed before being sent
  return accounts;
}


router.get("/mostListed", async (req, res) => {
    let paginationRequest;
    try {
        paginationRequest = new PaginationRequest(req.query);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message});
    }

    const sellers = await getAllSellers(paginationRequest);
    const accounts = await getAccountsFromAggregationResult(sellers, "totalListings");

    return res.json({
      sellers: accounts
    })
})


router.get("/mostLiked", async(req, res)=> {
  let paginationRequest;
  try {
      paginationRequest = new PaginationRequest(req.query);
  } catch (e) {
      console.error(e);
      return res.status(400).json({message: e.message});
  }

  const ratingRatios = await getTopRated(paginationRequest);
  const accounts = await getAccountsFromAggregationResult(ratingRatios, "ratio")

  return res.json({
    sellers: accounts
  });
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



router.put("/:id/comment", async (req, res) => {
  const userId = req.currentUser?.user_id
  const displayName = req.currentUser?.displayName || "Anon user";
  if(!userId || !displayName) {
    return res.status(401).json({message: "Must be logged in to comment"});
  }

  const sellerId = req.params.id;

  if(sellerId.length === 0) {
    return res.status(400).json({message: "Missing target user"});
  }

  let addedComment;
  try {
    const { commentText } = req.body;
    addedComment = new SellerComment({
      commentText,
      displayName,
      posterId: userId
    })
  } catch(e) {
    console.error(e);
    return res.status(400).json({message: e.message || "Required field missing"});
  }

  try {
    const updatedAccount = await addComment(addedComment, req.params.id);
    return res.json({seller: updatedAccount.asDictionary()})
  } catch(e) {
    if((e instanceof UserDoesNotExist)) {
      return res.status(404).json({message: "Seller not found"});
    }
    console.error(e);
    return res.status(500).json({message: "Failed to post comment"});
  }

});

module.exports = router;