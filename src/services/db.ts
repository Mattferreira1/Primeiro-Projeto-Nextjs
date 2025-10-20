// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1b7KZc7lTRI7vrn_5T00CvPRcnz8k0Sg",
  authDomain: "app1-9a384.firebaseapp.com",
  projectId: "app1-9a384",
  storageBucket: "app1-9a384.firebasestorage.app",
  messagingSenderId: "746678203613",
  appId: "1:746678203613:web:7c2fb3511f141a19c01734",
  measurementId: "G-BBX8L1V4HM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
