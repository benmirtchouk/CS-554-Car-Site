const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function decodeIDToken(req, res, next) {
  if (req.headers?.authorization) {
    const idToken = req.headers.authorization;
    // console.log('decode', idToken);

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.currentUser = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  // console.log('current user', req.currentUser);
  next();
}

module.exports = {
  decodeIDToken,
}