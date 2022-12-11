import { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import styles from "./navbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../../store/auth-context";
import { FaUserCircle } from "react-icons/fa";
import { db } from "../../firebase/firebase";
import { IoMdLogOut } from "react-icons/io";
import DropDown from "../dropDown";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut, getUsername, username } = useUserAuth();
  const [open, setOpen] = useState(true);


  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    getUsername();
  }, [user]);

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const toggle = () => {
    setOpen(!open);

    
  
  };

  return (
    <nav className=" d-flex align-items-center justify-content-between px-5  ">
      <div className={styles.logo} onClick={handleHome}>
        <img src={logo} alt="logo" className="w-75 h-100 cursor" />
      </div>

      <ul
        className={`d-flex align-items-center ${ 
          open ? `${styles.navItem} ${styles.open}` : `${styles.navItem}`
        }`}
        
      >
        <li
          className={`px-5 ${
            location.pathname === "/" ? `${styles.active}` : ""
          }  `}
        >
          <Link to="./">Home</Link>
        </li>
        <li
          className={`px-5 ${
            location.pathname === "/products" ? `${styles.active}` : ""
          }  `}
        >
          <Link to="./products">Products</Link>
        </li>

        {user && (
          <>
            <li
              className={`px-5 ${
                location.pathname === "/cart" ? `${styles.active}` : ""
              }  `}
            >
              <Link to="./cart" className="mr-3 d-flex align-items-center ">
                <GiShoppingCart className={`${styles.icon}  mainColor `} />
                <p className="m-0">Cart</p>
              </Link>
            </li>
            <li className="px-5 d-flex align-items-center">
              <DropDown />
              <p className="m-0">Wish List</p>
            </li>
          </>
        )}
      </ul>

      <div className="d-flex align-items-center">
        {!user ? (
          <div className={styles.btns}>
            <button
              className=" mainColorBack  w__700 btn text-white px-4"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <Link
              to="./profile"
              className={`px-5  d-flex align-items-center ${
                location.pathname === "/profile" ? `${styles.active}` : ""
              }  `}
            >
              <FaUserCircle className="mr-2" />
              <p className="m-0 w__700 text-uppercase">{username}</p>
            </Link>

            <IoMdLogOut
              className="ml-2 cursor mainColorBack text-white p-1 rounded-circle"
              style={{ fontSize: "30px" }}
              onClick={handleLogOut}
            />
          </div>
        )}

        <div className={styles.navMenu} onClick={toggle}>
          <div
            className={
              open ? `${styles.line} ${styles.open} ` : `${styles.line}`
            }
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
