 
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC149bJ5pa4QR0j7XBXY6jfJuW5mxnKZDg",
    authDomain: "prepwise-8d157.firebaseapp.com",
    projectId: "prepwise-8d157",
    storageBucket: "prepwise-8d157.firebasestorage.app",
    messagingSenderId: "442696796099",
    appId: "1:442696796099:web:2f94fd80fbddcbf77b5f76",
    measurementId: "G-N6Q6LTT2RB"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
