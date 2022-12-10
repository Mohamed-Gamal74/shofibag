import { FiHeart } from "react-icons/fi";
import { Dropdown, Space } from "antd";
import { useState, useEffect } from "react";
import wishListImg from "../../images/wishlist.png";
import styles from "./dropDown.module.css";
import { useWishList } from "../../store/wishList-context";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const DropDown = () => {
  const [items, setItems] = useState([]);
  const { wishList, removeFromWishList } = useWishList();
  const navigate = useNavigate();

  const deleteHandler = (e) => {
    removeFromWishList(e.target.id);
  };

  useEffect(() => {
    if (wishList.length > 0) {
      setItems(
        wishList.map((item) => ({
          key: item.id,
          label: (
            <div
              className={`${styles.cardContainer} my-2 px-3 d-flex justify-content-between  align-items-center`}
            >
              <div className="d-flex align-items-center">
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className={styles.imgWrapper}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid borderRaduis mr-3"
                  />
                </div>
                <div>
                  <p className="mb-2 w__700 ">{item.title}</p>
                  <p className="text-black-50 zenDots m-0">{item.category}</p>
                  <p className="m-0 zenDots mainColor">{`${item.price} $`}</p>
                </div>
              </div>

              <button className="btn " onClick={deleteHandler} id={item.id}>
                Delete
              </button>
            </div>
          ),
        }))
      );
    } else {
      setItems([
        {
          key: "1",
          label: (
            <div
              className={`${styles.imgContainer} d-flex flex-column align-items-center`}
            >
              <img
                src={wishListImg}
                alt="wishList"
                className="img-fluid mb-3"
              />
              <h5 className="mainColor text-center  zenDots ">
                Your WishList is Empty Add Now!
              </h5>
            </div>
          ),
        },
      ]);
    }
  }, [wishList]);

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      className="mr-1 cursor "
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <FiHeart className="mainColor" style={{ fontSize: "25px" }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;
