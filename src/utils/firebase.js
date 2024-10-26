// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzKLPZPGzSrnWtGo3OGX5G6J_7-DHW77A",
  authDomain: "netflixgpt-c6986.firebaseapp.com",
  projectId: "netflixgpt-c6986",
  storageBucket: "netflixgpt-c6986.appspot.com",
  messagingSenderId: "506511874589",
  appId: "1:506511874589:web:7dceb1b0c5248466c644f4",
  measurementId: "G-XP43P6V43C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();