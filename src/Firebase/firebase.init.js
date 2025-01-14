// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi-UxBBQX7YSTmfSuoL7pHPMhkBADOhYU",
  authDomain: "collaborative-study-plat-312b7.firebaseapp.com",
  projectId: "collaborative-study-plat-312b7",
  storageBucket: "collaborative-study-plat-312b7.firebasestorage.app",
  messagingSenderId: "151625545121",
  appId: "1:151625545121:web:b2763eeac5749669d307e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);