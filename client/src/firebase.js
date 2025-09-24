// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "easyestate-76f2c.firebaseapp.com",
  projectId: "easyestate-76f2c",
  storageBucket: "easyestate-76f2c.firebasestorage.app",
  messagingSenderId: "410516928099",
  appId: "1:410516928099:web:7cf93e621f21341f84aa56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);