import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "../../node_modules/firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password, username) {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      const ref = doc(db, "users", res.user.uid);
      setDoc(ref, {
        username: username,
        wishList: [],
        cart: [],
        completedOrders: [],
      });
    });
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function getUsername() {
    if (user) {
      const ref = doc(db, "users", user.uid);
      const docSnap = await getDoc(ref);
      setUsername(docSnap.data().username);
    }
  }

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, getUsername, username }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
