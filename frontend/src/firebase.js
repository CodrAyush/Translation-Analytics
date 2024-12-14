// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5XtrPPBeqd8GRmV0j5AvtVyPEhBRZBYY",
    authDomain: "assignment1-984a9.firebaseapp.com",
    projectId: "assignment1-984a9",
    storageBucket: "assignment1-984a9.firebasestorage.app",
    messagingSenderId: "617500593938",
    appId: "1:617500593938:web:f6bce11f82e1770e956dcb",
    measurementId: "G-94J0185VR4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);
