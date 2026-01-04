import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // Make sure this is imported
import { getFirestore } from "firebase/firestore"; // Make sure this is imported

const firebaseConfig = {
  apiKey: "AIzaSyC5vDDKT2ZD_C7247esI4L0GczIdBi7W2M",
  authDomain: "creative-showcase-7c0a6.firebaseapp.com",
  projectId: "creative-showcase-7c0a6",
  storageBucket: "creative-showcase-7c0a6.firebasestorage.app",
  messagingSenderId: "554616281120",
  appId: "1:554616281120:web:2b9f20cbf88eb4fbb30445",
  measurementId: "G-1KQ9E17T30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORT THE AUTH AND DB INSTANCES SO YOUR APP CAN USE THEM
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;