import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBywudpDtFhj99HRbcJMqs2vVtCx_tz6Fk",
  authDomain: "daily-recod.firebaseapp.com",
  projectId: "daily-recod",
  storageBucket: "daily-recod.appspot.com",
  messagingSenderId: "677087181658",
  appId: "1:677087181658:web:bc1d2c5053c3a0cc8e1163",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
