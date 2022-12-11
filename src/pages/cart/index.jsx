import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { db } from "../../firebase/firebase";
import { useUserAuth } from "../../store/auth-context";
import cartImg from "../../images/cart.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
import firebase from "firebase/compat/app";
import styles from "./cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deleteModal, setDeleteModale] = useState(false);
  const [checkModal, setCheckModale] = useState(false);
  const [productId, setProductId] = useState(0);

  const handleOk = () => {
    setDeleteModale(false);
    db.collection("users")
      .doc(user.uid)
      .update({
        cart: cart.filter((item) => item.id !== +productId),
      });
    toast.info("Item Removed From Cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleCancel = () => {
    setDeleteModale(false);
  };

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((snap) => {
          setCart(snap?.data()?.cart);
        });
    }
  }, [user]);

  useEffect(() => {
    let total = 0;
    let totalPrice = 0;
    cart?.forEach((item) => {
      total += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    setTotal(total);
    setTotalPrice(totalPrice);
  }, [cart]);

  const deleteItem = (e) => {
    setProductId(e.target.id);
    setDeleteModale(true);
  };

  const checkOutHandler = () => {
    setCheckModale(true);
  };

  const handleCheckOk = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .update({
          completedOrders: firebase.firestore.FieldValue.arrayUnion(...cart),
        });
      toast.success("Order Placed Successfully", { theme: "colored" });

      db.collection("users").doc(user.uid).update({
        cart: [],
      });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },

    {
      title: "Remove",
      dataIndex: "remove",
      key: "remove",
    },
  ];

  const data = cart?.map((item) => ({
    key: item.id,
    image: (
      <img
        src={item.img}
        alt={item.title}
        style={{ maxWidth: "100px" }}
        className="borderRaduis"
      />
    ),
    name: item.title,
    unitPrice: item.price + "$",
    quantity: item.quantity,
    size: item.size,
    totalPrice: item.price * item.quantity + "$",
    remove: (
      <Tag
        color="red"
        className="cursor ml-2"
        id={item.id}
        onClick={deleteItem}
      >
        Remove
      </Tag>
    ),
  }));

  return (
    <section
      style={{ minHeight: "90vh" }}
      className="py-5 mt-5 sectionContainer"
    >
      {cart?.length === 0 ? (
        <div className={`${styles.cartImg} d-flex justify-content-center flex-column align-items-center`}>
          <img src={cartImg} alt="cart" className="mb-2" />
          <h2 className="zenDots mainColor text-uppercase">
            Your cart is empty
          </h2>
          <button
            className="btn mainColorBack text-white w__700"
            onClick={() => navigate("/products")}
          >
            Shop Now!
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <h2 className="zenDots mainColor">Cart Information</h2>
            <Table
              columns={columns}
              dataSource={data}
              className="shadow-sm borderRaduis"
            />

            <Modal
              title="Are you sure you Want to Delete this Item?"
              open={deleteModal}
              onOk={handleOk}
              onCancel={handleCancel}
            ></Modal>

            <Modal
              title="Are you sure you Want to Check Out?"
              open={checkModal}
              onOk={handleCheckOk}
              onCancel={() => setCheckModale(false)}
            ></Modal>
          </div>
          <div
            className="col-md-4 borderRaduis shadow mainColorBack text-white mt-5 p-4"
            style={{ maxHeight: "320px" }}
          >
            <h2 className="zenDots mb-5">Summary</h2>
            <p className="d-flex align-content-center justify-content-between text-white-50 w__700 text-uppercase">
              total items <span className="text-white">{total}</span>
            </p>
            <p className="d-flex align-content-center justify-content-between text-white-50 w__700 text-uppercase mb-5">
              subtotal <span className="text-white">$ {totalPrice}</span>
            </p>

            <button
              className="btn w-100 mainColor w__700"
              style={{ background: "#fff" }}
              onClick={checkOutHandler}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default Cart;
