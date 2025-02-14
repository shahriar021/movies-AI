// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqeAF_Xbe-_nTrUfXXRHgCjaIBkWGFiJs",
  authDomain: "movies-ai-a7a51.firebaseapp.com",
  projectId: "movies-ai-a7a51",
  storageBucket: "movies-ai-a7a51.firebasestorage.app",
  messagingSenderId: "857585352345",
  appId: "1:857585352345:web:eccc7f3024b9efad9b0208",
  measurementId: "G-MGFMBVBW7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
