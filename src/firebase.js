// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBO8O1hBfNm-9yRQKh0V22rZV1-6w1aO4",
  authDomain: "simontask-f49a3.firebaseapp.com",
  projectId: "simontask-f49a3",
  storageBucket: "simontask-f49a3.appspot.com",
  messagingSenderId: "128415974707",
  appId: "1:128415974707:web:1d8300e863fb14f932ea46",
  measurementId: "G-VLB7L40PJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);