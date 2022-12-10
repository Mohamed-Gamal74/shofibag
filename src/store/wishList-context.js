import { createContext, useContext, useState, useEffect } from "react";
import { useUserAuth } from "./auth-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const wishListContext = createContext();

export function WishListContextProvider({ children }) {
  const { user } = useUserAuth();
  const [wishList, setWishList] = useState([]);

  function addToWishList(id, img, category, title, price) {
    const wishListRef = doc(db, "users", user.uid);
    updateDoc(wishListRef, {
      wishList: firebase.firestore.FieldValue.arrayUnion({
        id,
        img,
        category,
        title,
        price,
      }),
    });
    toast.success("Added to WishList", {
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

  function removeFromWishList(id) {
    const docRef = db.collection("users").doc(user.uid);

    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        let wishList = doc.data().wishList;
        let newWishList = wishList.filter((item) => item.id !== +id);
        updateDoc(docRef, {
          wishList: newWishList,
        }).then(() => {
          getWishList();
        });
        toast.info("Removed From WishList", {
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
    });
  }

  async function getWishList() {
    if (!user) return;
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.id === user.uid) {
          setWishList(doc.data().wishList);
        }
      });
    });
  }

  useEffect(() => {
    getWishList();
  }, [user ]);

  return (
    <wishListContext.Provider
      value={{ wishList, addToWishList, removeFromWishList }}
    >
      {children}
    </wishListContext.Provider>
  );
}

export function useWishList() {
  return useContext(wishListContext);
}
