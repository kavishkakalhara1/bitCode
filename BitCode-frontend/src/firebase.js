// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "refaa-4cce1.firebaseapp.com",
  projectId: "refaa-4cce1",
  storageBucket: "refaa-4cce1.appspot.com",
  messagingSenderId: "207317358625",
  appId: "1:207317358625:web:f15815cf184e365f94ab60",
  measurementId: "G-BJ39S72WKY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);