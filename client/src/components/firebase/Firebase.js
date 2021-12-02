import firebase from "firebase/app";
import "firebase/auth";

const fbConfigs = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

const fbApp = firebase.initializeApp(fbConfigs);
const auth = fbApp.auth();

const logInSocialMedia = async (provider) => {
  let user;
  switch (provider) {
    case "google":
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      await auth
        .signInWithPopup(googleProvider)
        .then((res) => {
          user = res.user;
          //let provToken = res.accessToken;
          console.log(
            `Logged In User (logInSocialMedia): uid: ${user.uid}, displayName: ${user.displayName}, email: ${user.email}, phoneNumber: ${user.phoneNumber}, photoURL: ${user.photoURL}`
          );
        })
        .catch((e) => {
          throw new Error(e);
        });
      break;

    case "facebook":
      const fbProvider = new firebase.auth.FacebookAuthProvider();
      await auth
        .signInWithPopup(fbProvider)
        .then((res) => {
          user = res.user;
          //let provToken = res.accessToken;
          console.log(
            `Logged In User (logInSocialMedia): uid: ${user.uid}, displayName: ${user.displayName}, email: ${user.email}, phoneNumber: ${user.phoneNumber}, photoURL: ${user.photoURL}`
          );
        })
        .catch((e) => {
          console.log(`${e}`);
          console.log(`${e.code}`);
          alert(`${e.message}`);
          throw new Error(e);
        });
      break;

    default:
      alert(`${provider} is not currently supported`);
      break;
  }
};

const signUpUserWithEmailPassword = async (
  email,
  password,
  displayName,
  phoneNumber
) => {
  //console.log(`FORM INPUTS: email: ${email}, displayName: ${displayName}, phoneNumber: ${phoneNumber}`);
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      let user = auth.currentUser;
      user.updateProfile({
        displayName: displayName,
        phoneNumber: phoneNumber,
      });
      // sign out of the register and force them to login
      alert(
        `${displayName} has successfully registered.  Please proceed to login`
      );
      auth.signOut();
    })
    .catch((e) => {
      console.log(`${e}`);
      console.log(`${e.code}`);
      alert(`${e.message}`);
      throw new Error(e);
    });
};

const logInEmailPassword = async (email, password) => {
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      let user = res.user;
      console.log(
        `Logged In User (logInEmailPassword): uid: ${user.uid}, displayName: ${user.displayName}, email: ${user.email}, phoneNumber: ${user.phoneNumber}, photoURL: ${user.photoURL}`
      );
    })
    .catch((e) => {
      throw new Error(e);
    });
};

const logOut = async () => {
  await auth.signOut().catch((e) => {
    console.log(`${e}`);
    throw new Error(e);
  });
};

export {
  fbApp,
  auth,
  logInSocialMedia,
  logOut,
  signUpUserWithEmailPassword,
  logInEmailPassword,
};
