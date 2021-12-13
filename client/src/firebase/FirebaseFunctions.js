import firebase from "firebase/app";

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  firebase.auth().currentUser.updateProfile({ displayName: displayName });
}

async function getAuthToken() {
  return firebase.auth().currentUser.getIdToken(true);
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new firebase.auth.FacebookAuthProvider();
  }
  await firebase.auth().signInWithPopup(socialProvider);
}

async function doPasswordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
  const user = firebase.auth().currentUser;
  user.updatePassword(password);
}

async function doSignOut() {
  await firebase.auth().signOut();
}

async function doReAuthenticate(password) {
  const user = firebase.auth().currentUser;
  // create user credentials with the input password
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  // Verify that the input password is correct
  await user.reauthenticateWithCredential(credentials);
}

export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
  getAuthToken,
  doReAuthenticate,
};
/*
const signUpUserWithEmailPassword = async (email, password, displayName, phoneNumber) => {
   //console.log(`FORM INPUTS: email: ${email}, displayName: ${displayName}, phoneNumber: ${phoneNumber}`);
   await auth.createUserWithEmailAndPassword(email, password).then( (res) => {
      let user=auth.currentUser;
      user.updateProfile({ displayName:displayName, phoneNumber:phoneNumber });
      // sign out of the register and force them to login
      alert(`${displayName} has successfully registered.  Please proceed to login`);
      auth.signOut();
   }).catch( (e) => {
      console.log(`${e}`);
      console.log(`${e.code}`);
      alert(`${e.message}`);
      throw new Error(e);
   });
}
*/
