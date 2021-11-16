import firebase from 'firebase/app';
import 'firebase/auth';

const fbConfigs = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

const fbApp = firebase.initializeApp(fbConfigs);
const auth = fbApp.auth();

const logInSocialMedia = async (provider) => {
  try {
     switch(provider) {
        case 'google':
           const googleProvider = new firebase.auth.GoogleAuthProvider();
           await auth.signInWithPopup(googleProvider);
	   break;

        case 'facebook':
           const fbProvider = new firebase.auth.FacebookAuthProvider();
           await auth.signInWithPopup(fbProvider);
	   break;

        default:
          alert(`${provider} is not currently supported`);
	   break;
	}
     }
     catch(e) {
       console.log(`${e}`);
       alert(e);
     }
}

const signUpUserWithEmailPassword = async (email, password, displayName) => {
  try {
     console.log(`email: ${email}, password: ${password}, displayName: ${displayName}`);
     await auth.createUserWithEmailAndPassword(email, password)
     console.log(`got back from createUserWithEmailAndPassword`);
     auth.currentUser.updateProfile({ displayName: displayName });
     console.log(`got back from adding current user`);
  } 
  catch(e) {
    console.log(`${e}`);
    alert(`${e.message}`);
  }
}

const logInEmailPassword = async (email, password) => {
  try {
     await auth.signInWithEmailAndPassword(email, password);
  } 
  catch(e) {
    console.log(`${e}`);
    alert(`${e.message}`);
  }
}

const logOut = async () =>  {
  try {
    await auth.signOut();
  } 
  catch(e) {
    console.log(`${e}`);
    throw new Error(e);
  }
}

export {fbApp, auth, logInSocialMedia, logOut, signUpUserWithEmailPassword, logInEmailPassword};
