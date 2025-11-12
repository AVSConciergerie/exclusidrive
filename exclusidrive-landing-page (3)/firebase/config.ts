// FIX: Switched to Firebase v9 compat libraries to resolve "not exported" errors,
// which typically occur when using v9 modular syntax with an older Firebase version installed.
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration, as provided by the user.
const firebaseConfig = {
  apiKey: "AIzaSyALNvTCYKC_ogY4RelUlB8krH5vFO8lTKU",
  authDomain: "exclusidrive.firebaseapp.com",
  databaseURL: "https://exclusidrive-default-rtdb.europe-west1.firebaseddatabase.app",
  projectId: "exclusidrive",
  storageBucket: "exclusidrive.appspot.com",
  messagingSenderId: "1034913816703",
  appId: "1:1034913816703:web:f698b318f68abc88941f4a",
  measurementId: "G-7VW3VKHNK6"
};

// FIX: Initialize Firebase using the compat library and prevent re-initialization.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get Firestore and Auth instances
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
