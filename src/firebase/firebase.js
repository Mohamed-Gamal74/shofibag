import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6xDlKrAMOdTA915jSdd46k4gLNklt6C0",
  authDomain: "shofibag.firebaseapp.com",
  projectId: "shofibag",
  storageBucket: "shofibag.appspot.com",
  messagingSenderId: "995386669480",
  appId: "1:995386669480:web:dfdcf41e0384f4842f059d",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();
export default app;




