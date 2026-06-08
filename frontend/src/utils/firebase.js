import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reverto-3657d.firebaseapp.com",
  projectId: "reverto-3657d",
  storageBucket: "reverto-3657d.firebasestorage.app",
  messagingSenderId: "131049886384",
  appId: "1:131049886384:web:ec03e28dacc6baf87da175",
  measurementId: "G-8270VT5K64",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();