import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

export const app = firebase.initializeApp({
  projectId: "challenge-fs-images",
  appId: "1:113771193924:web:79c128b05b69e9a5693e11",
  storageBucket: "challenge-fs-images.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyAU8jpq_f5PGfRjj7okK9PRlrprj1k4qGY",
  authDomain: "challenge-fs-images.firebaseapp.com",
  messagingSenderId: "113771193924",
  measurementId: "G-DGMS2SN7P0",
});
