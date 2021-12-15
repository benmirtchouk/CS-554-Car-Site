const multer = require("multer")

/// TODO FILE LIMITS AND FILE TYPES 
const testMiddleWare = multer( {
    dest: "./tmp/"
})


module.exports = {
    testMiddleWare
}