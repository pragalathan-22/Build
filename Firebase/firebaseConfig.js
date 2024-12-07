// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3xI5hP-fZmZcL-bmnMqHiCK-FrLEps68",
  authDomain: "cooper-application.firebaseapp.com",
  projectId: "cooper-application",
  storageBucket: "cooper-application.firebasestorage.app",
  messagingSenderId: "600897337641",
  appId: "1:600897337641:web:81f584b0c612b908839f38",
  measurementId: "G-0WX1CKQNWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
