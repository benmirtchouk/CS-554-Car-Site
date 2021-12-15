const mongo = require("mongodb");
const { accounts } = require("../config/mongoCollections");
const Account = require("../DataModel/Account/Account");
const { InternalMongoError, KeyAlreadyExists } = require("./OperationErrors");
const { ValidationError } = require("../DataModel/Validation/ObjectProperties");
const e = require("express");
const ret = require("bluebird/js/release/util");

const createAccount = async (account) => {
  if (!(account instanceof Account)) {
    throw new Error("Object being updated must be an account");
  }

  const collection = await accounts();

  await collection
    .insertOne(account)
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

module.exports = {
  createAccount,
  getAccount,
  updateAccount,
};