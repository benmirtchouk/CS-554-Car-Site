import firebase from 'firebase/app';
import { signInWithPopUp } from "firebase/auth";
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
  let res;
  try {
     switch(provider) {
        case 'google':
           const googleProvider = new firebase.auth.GoogleAuthProvider();
           res = await auth.signInWithPopup(googleProvider);
           console.log(`got back from logInSocialMedia, uuid: ${res.user.uid}`);
	   console.log(res.user);
	   break;

        case 'facebook':
           const fbProvider = new firebase.auth.FacebookAuthProvider();
           res = await auth.signInWithPopup(fbProvider);
           console.log(`got back from logInSocialMedia, uuid: ${res.user.uid}`);
	   console.log(res.user);
	   break;

        default:
          alert(`${provider} is not currently supported`);
	   break;
	}
     }
     catch(e) {
       console.log(`${e}`);
       console.log(`${e.code}`);
       alert(e.code);
     }
}

const signUpUserWithEmailPassword = async (email, password, displayName) => {
  try {
     console.log(`email: ${email}, password: ${password}, displayName: ${displayName}`);
     let res = await auth.createUserWithEmailAndPassword(email, password)
     console.log(`got back from createUserWithEmailAndPassword, uuid: ${res.user.uid}`);
     console.log(res.user);
     auth.currentUser.updateProfile({ displayName: displayName });
     console.log(`got back from adding current user`);
  } 
  catch(e) {
    console.log(`${e}`);
    alert(`${e.message}`);
  }
}

const logInEmailPassword = async (email, password) => {
     await auth.signInWithEmailAndPassword(email, password).then( (res) => {
        console.log(`got back from logInEmailPassword, uuid: ${res.user.uid}`);
        console.log(res.user);
     }).catch( (e) => {
       console.log(`${e}`);
       alert(`${e.message}`);
     });
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
