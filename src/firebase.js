// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwEIv39GGtfL2tr3A5O3cHKznuKCwTpgI",
  authDomain: "schnuppertage-26fd3.firebaseapp.com",
  projectId: "schnuppertage-26fd3",
  storageBucket: "schnuppertage-26fd3.appspot.com",
  messagingSenderId: "797608892526",
  appId: "1:797608892526:web:241d3746d1363cf29cee7f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const messagesCollection = collection(db, "messages");
