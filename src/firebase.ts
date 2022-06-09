// Import FirebaseAuth and firebase.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createUser } from "src/services/firestore";
import Router, { withRouter } from 'next/router'

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCk6SavtDWYhqZQHrEnCcmU0-53K3SY8VQ",
  authDomain: "devacademy-343218.firebaseapp.com",
  projectId: "devacademy-343218",
  storageBucket: "devacademy-343218.appspot.com",
  messagingSenderId: "594596332077",
  appId: "1:594596332077:web:defdd73bd0221f96b6eea4",
  measurementId: "G-HXN9FCW0YL",
};
const app = firebase.initializeApp(config);
const db = getFirestore(app);
const firStorage = getStorage(app);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      if (authResult.additionalUserInfo.isNewUser) {
        let id = authResult.user.uid;
        let email = authResult.additionalUserInfo.profile.email;
        let name = authResult.additionalUserInfo.profile.name;
        createUser(id, email, name);
      }
    },
  },
};

export { firebase, uiConfig, db, firStorage };
