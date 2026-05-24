// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAR-EJT1HoH3z67hzDhUejjcWTPbibUnY",
  authDomain: "psc-companion-c414a.firebaseapp.com",
  projectId: "psc-companion-c414a",
  storageBucket: "psc-companion-c414a.firebasestorage.app",
  messagingSenderId: "952920113239",
  appId: "1:952920113239:web:9678e0d7a4c8f82cad2312",
  measurementId: "G-ZT4M64FR9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();