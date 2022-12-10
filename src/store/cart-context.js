import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUserAuth } from "./auth-context";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cartContext = createContext();

export function CartContextProvider({ children }) {
  const { user } = useUserAuth();

  function addToCart(
    id,
    img,
    category,
    title,
    price,
    quantity = 1,
    size = "S"
  ) {
    const cartRef = doc(db, "users", user.uid);
    updateDoc(cartRef, {
      cart: firebase.firestore.FieldValue.arrayUnion({
        id,
        img,
        category,
        title,
        price,
        quantity,
        size,
      }),
    });
    toast.success("Added to Cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }


  return (
    <cartContext.Provider value={{ addToCart }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  return useContext(cartContext);
}
