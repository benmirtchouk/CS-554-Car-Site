const {
  applyValidation,
  validateId,
  validateNonBlankString,
  validateNullOrNonBlankString,
  validateNonNegativeInteger,
} = require("../Validation/ObjectProperties");

/// Representation of Account data for a given user
const nullableStringKeys = [
  "displayName",
  "phoneNumber",
  "address1",
  "address2",
  "city",
  "state",
  "zipCode",
  "firstName",
  "lastName",
];

const nullableIntKeys = [
  "like",
  "dislike"
]

class Account {
  constructor(dictionary) {
    const nonBlankKeys = ["_id"];
    applyValidation(nonBlankKeys, dictionary, validateNonBlankString, this);

    applyValidation(
      nullableStringKeys,
      dictionary,
      validateNullOrNonBlankString,
      this
    );

    applyValidation(nullableIntKeys, dictionary, (int) => {
      if(int === undefined) { return null }
      return validateNonNegativeInteger(int);
    }, this)
  }

  asDictionary() {
    const dictionary = {
      _id: this._id,
    };

    for (const key of nullableStringKeys) {
      if (this[key]) {
        dictionary[key] = this[key];
      }
    }
    return dictionary;
  }
}

module.exports = Account;
