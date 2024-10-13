// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1rsxhIy2ASEfdUZrfjm2KEsEhOGxJ094",
  authDomain: "react-ecommerce-admin-2c3dd.firebaseapp.com",
  projectId: "react-ecommerce-admin-2c3dd",
  storageBucket: "react-ecommerce-admin-2c3dd.appspot.com",
  messagingSenderId: "858264691441",
  appId: "1:858264691441:web:b11646acbb6c9c69f77f50",
  measurementId: "G-YH4SNHC8RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()

const loginUser = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password);
}

export { db,auth,loginUser }