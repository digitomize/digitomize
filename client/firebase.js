import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// firebase configurations
const firebaseConfig = {
  apiKey: "AIzaSyAbjT7WV8XlDaKv_Ge-nI7sk9DIiduh3N4",
  authDomain: "digitomize-9d71d.firebaseapp.com",
  projectId: "digitomize-9d71d",
  storageBucket: "digitomize-9d71d.appspot.com",
  messagingSenderId: "600437320812",
  appId: "1:600437320812:web:2e10530e0818b595b73c49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { auth, app };