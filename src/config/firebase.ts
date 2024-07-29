// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOxIZFtPZSF_RoRNGtwLz30c4t68Qe9a0",
    authDomain: "auth-test-controls-group.firebaseapp.com",
    projectId: "auth-test-controls-group",
    storageBucket: "auth-test-controls-group.appspot.com",
    messagingSenderId: "230323936121",
    appId: "1:230323936121:web:35e79f9ef16d1448f4eda8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app)

export { app, firebaseAuth }