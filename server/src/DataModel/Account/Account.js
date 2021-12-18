const {
  applyValidation,
  validateId,
  validateNonBlankString,
  validateNullOrNonBlankString,
  validateNonNegativeInteger,
  ValidationError
} = require("../Validation/ObjectProperties");
const SellerComment = require("./SellerComment");

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


    let sellerComments = dictionary.sellerComments === null ? undefined: dictionary.sellerComments

    if(sellerComments !== undefined) {
        if(!Array.isArray(sellerComments)) { throw new ValidationError("NullableArrayOfComments", "must be an array if non null"); }
        sellerComments = sellerComments.map(e => new SellerComment(e));
    }
    this.sellerComments = sellerComments


  }

  asDictionary() {
    const dictionary = {
      _id: this._id,
    };

    for (const key of nullableStringKeys.concat(nullableIntKeys)) {
      if (this[key]) {
        dictionary[key] = this[key];
      }
    }

    if(this.sellerComments != null) {
      dictionary.sellerComments = this.sellerComments.map(e => e.asDictionary() )
    }

    return dictionary;
  }
}

module.exports = Account;
