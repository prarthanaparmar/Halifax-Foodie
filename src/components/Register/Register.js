import React from 'react';
import PropTypes from 'prop-types';
import './Register.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
// import firebase from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/firestore';
import 'firebase/auth';
import  firebase from '../../services/firebase';

const auth = firebase.auth();

function Register() {

    const [user] = useAuthState(auth);
  
    return (
      <body>
          <Header />
          <div className="home-screen-container">
                <div className="home-screen-content">
                <SignIn />
                </div>
          </div>
        </body>
    );
  }
  
  function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <p>Do not violate the community guidelines or you will be banned for life!</p>
      </>
    )
  
  }
// Register.propTypes = {};

// Register.defaultProps = {};

export default Register;
