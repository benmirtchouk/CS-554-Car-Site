const {
  applyValidation,
  validateId,
  validateNonBlankString,
  validateNullOrNonBlankString,
  validateNonNegativeInteger,
} = require("../Validation/ObjectProperties");

/// Representation of Account data for a given user
class Account {
  constructor(dictionary) {
    const nonBlankKeys = ["_id"];
    applyValidation(nonBlankKeys, dictionary, validateNonBlankString, this);

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
    applyValidation(
      nullableStringKeys,
      dictionary,
      validateNullOrNonBlankString,
      this
    );

    // const intKeys = ["_id"]
    // applyValidation(intKeys, dictionary, validateNonNegativeInteger, this);
  }

  asDictionary() {
    const dictionary = {
      _id: this._id,
    };

    for (const key of this.nullableStringKeys) {
      if (this[key]) {
        dictionary[key] = this[key];
      }
    }
    return dictionary;
  }
}

module.exports = Account;
