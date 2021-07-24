import "firebase/auth";
import "firebase/database";
import "firebase/firestore"

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCG7nlL2dMCiYKHz2hOKWakqZlAlrHJkFg",
  authDomain: "sp25-bed72.firebaseapp.com",
  projectId: "sp25-bed72",
  storageBucket: "sp25-bed72.appspot.com",
  messagingSenderId: "235009542425",
  appId: "1:235009542425:web:c45b7bd81bced825e29d88"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

// export const auth = firebase.auth();
// export const db = firebase.database();