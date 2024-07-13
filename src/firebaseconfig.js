// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGsgLZLq11p_G3vVIzXiq_xV74p_TSZYM",
  authDomain: "techspot-objectorienters.firebaseapp.com",
  projectId: "techspot-objectorienters",
  storageBucket: "techspot-objectorienters.appspot.com",
  messagingSenderId: "960176997809",
  appId: "1:960176997809:web:bd2cf046835b5c44f32990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
