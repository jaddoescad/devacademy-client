// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase, uiConfig } from "src/firebase";
import { useRouter } from "next/router";

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const router = useRouter();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  // If signed in, redirect to the home page.
  useEffect(() => {
    if (isSignedIn) {
      router.push("/instructor");
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }

  return (
    <div color="white">
      {/* <h1>My App</h1>
      <p>
        Welcome {firebase.auth().currentUser?.displayName} You are now
        signed-in!
      </p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
    </div>
  );
}

export default SignInScreen;
