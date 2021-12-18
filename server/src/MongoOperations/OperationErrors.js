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

class UserDoesNotExist extends Error {
    constructor(id, message) {
        super(message)
        this.id = id
    }
}

class InvalidOperation extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = {
    InternalMongoError,
    KeyAlreadyExists,
    KeyDoesNotExist,
    UserDoesNotExist,
    InvalidOperation,
}
