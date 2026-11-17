import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqeAF_Xbe-_nTrUfXXRHgCjaIBkWGFiJs",
  authDomain: "movies-ai-a7a51.firebaseapp.com",
  projectId: "movies-ai-a7a51",
  storageBucket: "movies-ai-a7a51.firebasestorage.app",
  messagingSenderId: "857585352345",
  appId: "1:857585352345:web:eccc7f3024b9efad9b0208",
  measurementId: "G-MGFMBVBW7T",
};

const app = initializeApp(firebaseConfig);

// Analytics only works in real browsers (not in tests / some privacy modes)
isSupported()
  .then((ok) => ok && getAnalytics(app))
  .catch(() => {});

export const auth = getAuth(app);

/** Turns Firebase error codes into friendly sentences. */
export function friendlyAuthError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in.";
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a minute and try again.";
    case "auth/network-request-failed":
      return "Network error — check your connection.";
    case "auth/missing-email":
      return "Please enter your email.";
    default:
      return "Something went wrong. Please try again.";
  }
}
