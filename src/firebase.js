// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCANhofjT1QPxrFhmLBGga020FtNM9voDs",
  authDomain: "schnuppertag-hslu.firebaseapp.com",
  projectId: "schnuppertag-hslu",
  storageBucket: "schnuppertag-hslu.appspot.com",
  messagingSenderId: "484393718834",
  appId: "1:484393718834:web:cb5b218d6b30f74666982b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const messagesCollection = collection(db, "messages");