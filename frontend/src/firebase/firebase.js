GK// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "medsafenet.firebaseapp.com",
  projectId: "medsafenet",
  storageBucket: "medsafenet.firebasestorage.app",
  messagingSenderId: "755749808017",
  appId: "1:755749808017:web:b172b993fa5c74d62d5c30",
  measurementId: "G-CFN69EQJM5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
