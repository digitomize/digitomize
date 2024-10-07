import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// Firebase configurations
const firebaseConfig = {
  apiKey: "AIzaSyCLurJYejrMmapRTzXSJLI5QPurcoUNQNE",
  authDomain: "digitomise-b4970.firebaseapp.com",
  projectId: "digitomise-b4970",
  storageBucket: "digitomise-b4970.appspot.com",
  messagingSenderId: "977877319434",
  appId: "1:977877319434:web:3e91a47a3a7359c1ac04f3",
  measurementId: "G-06H0VVZQK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export default app;
