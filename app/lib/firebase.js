import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxRkv3Urob91IWhJ_yGIxf9DC-DfuVq8A",
  authDomain: "karyana-app-6bc9e.firebaseapp.com",
  projectId: "karyana-app-6bc9e",
  storageBucket: "karyana-app-6bc9e.firebasestorage.app",
  messagingSenderId: "517196132360",
  appId: "1:517196132360:web:98a79ced5bb745d13921bd",
  measurementId: "G-CCVMQD9F57"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, firebaseConfig };
