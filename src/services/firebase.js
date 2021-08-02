import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAhVh-Vw0kAPt0CQ5ImjmBWr4c8S_Z0NKg",
    authDomain: "serverless-project-ff76a.firebaseapp.com",
    projectId: "serverless-project-ff76a",
    storageBucket: "serverless-project-ff76a.appspot.com",
    messagingSenderId: "301849257111",
    appId: "1:301849257111:web:778133b94f5cdb1af3b5d2",
    measurementId: "G-GBC8BZ63JM"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

