// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk6SavtDWYhqZQHrEnCcmU0-53K3SY8VQ",
  authDomain: "devacademy-343218.firebaseapp.com",
  projectId: "devacademy-343218",
  storageBucket: "devacademy-343218.appspot.com",
  messagingSenderId: "594596332077",
  appId: "1:594596332077:web:defdd73bd0221f96b6eea4",
  measurementId: "G-HXN9FCW0YL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" && getAnalytics(app);
const storage = getStorage(app);

export const uploadImageToFirebase = (fileImage) => {
  const file = fileImage;
  const coverImageRef = ref(storage, `course-cover-image/${uuidv4()}`);

  //   var userRef = storageRef.child('course-cover-image').child(uuidv4())
  return uploadBytes(coverImageRef, fileImage)
  .then((snapshot) => {
    return getDownloadURL(snapshot.ref) // Will return a promise with the download link
  })
  // .then((downloadURL) => {
  //   if (!downloadURL) return
  //   console.log(downloadURL)
  // })
};
