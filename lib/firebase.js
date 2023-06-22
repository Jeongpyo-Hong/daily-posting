import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBywudpDtFhj99HRbcJMqs2vVtCx_tz6Fk",
  authDomain: "daily-recod.firebaseapp.com",
  projectId: "daily-recod",
  storageBucket: "daily-recod.appspot.com",
  messagingSenderId: "677087181658",
  appId: "1:677087181658:web:bc1d2c5053c3a0cc8e1163",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
