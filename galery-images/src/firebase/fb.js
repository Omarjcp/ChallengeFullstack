import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

export const app = firebase.initializeApp({
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  locationId: "us-central",
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
});
