
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACfx40QbPgsvDlWn1aXt0rduM4Qwe1LGg",
  authDomain: "edulearn-hub-20ab7.firebaseapp.com",
  databaseURL: "https://edulearn-hub-20ab7-default-rtdb.firebaseio.com",
  projectId: "edulearn-hub-20ab7",
  storageBucket: "edulearn-hub-20ab7.appspot.com",
  messagingSenderId: "267100341744",
  appId: "1:267100341744:web:d35f15f060a1244660c935",
  measurementId: "G-HVJM50K6V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app)