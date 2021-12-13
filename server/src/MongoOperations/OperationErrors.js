class InternalMongoError extends Error {

}

class KeyAlreadyExists extends Error {
    constructor(key, message) {
        super(message)
        this.key = key
    }
}

class KeyDoesNotExist extends Error {
    constructor(key, message) {
        super(message)
        this.key = key
    }
}

module.exports = {
    InternalMongoError,
    KeyAlreadyExists,
    KeyDoesNotExist,
}
