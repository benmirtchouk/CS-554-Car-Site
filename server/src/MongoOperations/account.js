const {ObjectId} = require("mongodb");
const { accounts } = require("../config/mongoCollections");
const Account = require("../DataModel/Account/Account");
const { InternalMongoError, KeyAlreadyExists, UserDoesNotExist, InvalidUserInput, InvalidOperation } = require("./OperationErrors");
const { ValidationError } = require("../DataModel/Validation/ObjectProperties");
const e = require("express");
const ret = require("bluebird/js/release/util");
const PaginationRequest = require("../PaginationRequest");
const SellerComment = require("../DataModel/Account/SellerComment");

const createAccount = async (account) => {
  if (!(account instanceof Account)) {
    throw new Error("Object being updated must be an account");
  }

  const collection = await accounts();

  await collection
    .insertOne(account.asDictionary())
    .then((ret) => {
      if (ret.insertedId !== account._id) {
        throw new InternalMongoError("Insertion failed");
      }
      return account;
    })
    .catch((e) => {
      throw new InternalMongoError("Insertion failed");
    });
};

const getAccount = async (id) => {
  let account;
  if (!id) {
    throw new Error("User id is required to get account data");
  }
  const collection = await accounts();

  // return account - even if it's null
  try {
    account = await collection.findOne({ _id: id });
    return account;
  } catch (e) {
    throw new InternalMongoError("Insertion failed");
  }
};


const getAccounts = async( ids) => {
  if (!Array.isArray(ids)) {
    throw new Error("Ids must be an array")
  }


  /// Commented out as collection is currently keyed by strings
  //let mongoIds = ids.map(e => new ObjectId(e))

  const collection = await accounts();

  const foundAccounts = await collection.find({_id: {$in: ids}}).toArray()

  return foundAccounts;
}

const updateAccount = async (account) => {
  if (!(account instanceof Account)) {
    throw new Error("Object being updated must be a user account!");
  }

  const collection = await accounts();

  // check to see if the account exists
  let existing_account;
  try {
    existing_account = await collection.findOne({ _id: account._id });
  } catch (e) {
    throw new InternalMongoError("Find failed");
  }

  if (!existing_account) {
    console.log(
      `Account does not exist for user ${account.id}, inserting account instead`
    );
    try {
      account = await createAccount(account);
      return account;
    } catch (e) {
      throw new InternalMongoError("Find failed");
    }
  } else {
    // update any changed values
    let updates = { _id: account._id };
    for (const [key, val] of Object.entries(account)) {
      console.log(`${key}: ${val}`);
      let old_val = existing_account[key];
      if (val !== old_val) updates[key] = val;
    }

    await collection
      .updateOne({ _id: account._id }, { $set: updates })
      .then(async (ret) => {
        // get the updated account and return
        try {
          let existing_account = await getAccount(account._id);
          return existing_account;
        } catch (e2) {
          throw new InternalMongoError(
            "Could not retrieve updated account info"
          );
        }
      })
      .catch((e) => {
        throw new InternalMongoError("update");
      });
    console.log(`I got here`);
    return existing_account;
  }
};


const modifyRating = async (id, rating, modifyAmount) => {
  const validRatings = new Set(["like", "dislike" ]);
  if(!validRatings.has(rating)) {
    throw new Error("Rating is not valid");
  }

  if(!Number.isInteger(modifyAmount)) {
    throw new Error("Rating must be an Integer");
  }
  
  const account = await getAccount(id);
  if(account == null) {
    throw new UserDoesNotExist(id, "No user found for this id");
  }

  if(modifyAmount < 0 && account[rating] + modifyAmount < 0) {
    throw new InvalidOperation("Modification would go negative");
  }

  const collection = await accounts();

  const updateResult = await collection
                            .updateOne({_id: id},
                              {$inc: {[rating]: modifyAmount}}
                            )

  if(updateResult.modifiedCount !== 1) {
    throw new InternalMongoError("Update not applied!")
  }

  const updatedAccount = await getAccount(id);
  return {like: updatedAccount.like, dislike: updatedAccount.dislike}
}


const addComment = async ( comment, toSellerId ) => {
  if(!(comment instanceof SellerComment)) {
    throw new Error("Comment is not a data object")
  }

  
  const collection = await accounts();
  const updateResult = await collection
                      .updateOne({_id: toSellerId},
                      {$push: {sellerComments: {...comment.asDictionary()} }}
    
  )

  console.log(updateResult);
  if(updateResult.modifiedCount === 0) {
    throw new UserDoesNotExist(toSellerId, "Target user does not exist!");
  }

  const updatedAccount = await getAccount(toSellerId);
  return new Account(updatedAccount);
}


const getTopRated = async (paginationRequest) => {

  if(!paginationRequest instanceof PaginationRequest) {
    throw new Error("Pagination request not provided")
  }

const {offset, limit } = paginationRequest;
  const pipeline = [

    {
      $project: {
        like: { $ifNull: [ '$like', 0 ] },
        dislike: '$dislike', 
      }
    }, {
      $project: {
        like: '$like',
        /// If like is 0, return 1 on dislike to avoid divide by zero, and keep no ratings at 0%
        dislike: { $ifNull: ['$dislike', { $cond: [ {$gte: ['$like', 1] }, 0, 1 ] }] } 
      }
    }, {
      $project: {
        totalRatings: { '$add': [ '$like', '$dislike' ] }, 
        like: '$like'
      }
    }, {
      $project: { 'ratio': { '$divide': [ '$like', '$totalRatings' ] } }
    }, {
      $sort: {ratio: -1 }
    }, {
       $skip: offset
    }, {
      $limit: limit
    }
  ]

  const collection = await accounts();
  const aggCursor = collection.aggregate(pipeline);
    const data = {}
    for await (const doc of aggCursor) {
        data[doc._id] = doc.ratio
    }

    return data;
}

module.exports = {
  createAccount,
  getAccount,
  getAccounts,
  modifyRating ,
  updateAccount,
  getTopRated,
  addComment,
};
