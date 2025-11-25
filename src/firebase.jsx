// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB-keCzJv-UYrkBGrXCcgHrP_OQzD7Ar4Q",
  authDomain: "react-chatapp-ac0a9.firebaseapp.com",
  projectId: "react-chatapp-ac0a9",
  storageBucket: "react-chatapp-ac0a9.firebasestorage.app",
  messagingSenderId: "675869374078",
  appId: "1:675869374078:web:ae6e9af968e026e3b94a2f",
  measurementId: "G-TP0GGH654Q"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
