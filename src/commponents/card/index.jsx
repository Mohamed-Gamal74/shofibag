import { useState } from "react";
import styles from "./card.module.css";
import { RiStarSFill } from "react-icons/ri";
import { HiOutlineLogin } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserAuth } from "../../store/auth-context";
import { useWishList } from "../../store/wishList-context";
import { FcLike } from "react-icons/fc";
import { db } from "../../firebase/firebase";
import firebase from "../../../node_modules/firebase/compat";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const Card = ({ img, category, title, price, id }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [isLiked, setIsLiked] = useState(false);
  const { addToWishList } = useWishList();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    addToWishList(id, img, category, title, price);
  };

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const wishList = doc.data().wishList;
            const isLiked = wishList.find((item) => item.id === id);
            if (isLiked) {
              setIsLiked(true);
            }
          }
        });
    }
  }, [user, id]);

  const animation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <ToastContainer limit={3} className={styles.toast} />

      <motion.div
        variants={animation}
        initial="hidden"
        animate="visible"
        className={`${styles.cardContainer} cardHover shadow d-flex flex-column mb-4  p-4 borderRaduis `}
      >
        <div className={styles.imgContainer} onClick={handleCardClick}>
          <img src={img} alt="product" className="cursor" />
        </div>

        <div className="info">
          <p className="text-black-50 zenDots">{category}</p>
          <h4 className="w__700 m-0">{title}</h4>
          <div className="mb-2">
            <RiStarSFill className={styles.star} />
            <RiStarSFill className={styles.star} />
            <RiStarSFill className={styles.star} />
            <RiStarSFill className={styles.star} />
            <RiStarSFill className={styles.star} />
          </div>

          <div className="d-flex  align-items-center justify-content-between">
            <p className="m-0 mainColor w__700">{`${price} $`}</p>
            {user ? (
              <div className="d-flex align-items-center">
                <FcLike
                  className={isLiked ? "d-none cursor" : "cursor"}
                  onClick={handleLike}
                  style={{ fontSize: "1.5rem" }}
                />
              </div>
            ) : (
              <HiOutlineLogin
                className={styles.icon}
                onClick={handleNavigate}
              />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
