import styles from "./profile.module.css";
import { useUserAuth } from "../../store/auth-context";
import banner from "../../images/banner.jpg";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";

const Profile = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const { user } = useUserAuth();
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((snap) => {
          setCompletedOrders(snap?.data()?.completedOrders);
        });
    }
  }, [user]);

  useEffect(() => {
    let total = 0;
    let totalPrice = 0;
    completedOrders?.forEach((item) => {
      total += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    setTotal(total);
    setTotalPrice(totalPrice);
  }, [completedOrders]);

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
  ];

  const data = completedOrders?.map((item) => {
    return {
      key: Math.random(),
      image: (
        <img
          src={item.img}
          alt="product"
          style={{ maxWidth: "100px" }}
          className="borderRaduis"
        />
      ),
      name: item.title,
      unitPrice: item.price + "$",
      quantity: item.quantity,
      size: item.size,
      totalPrice: item.price * item.quantity + "$",
    };
  });

  const { username } = useUserAuth();
  return (
    <section style={{ minHeight: "90vh" }}>
      <div className={styles.imgContainer}>
        <img src={banner} alt="banner" className="img-fluid" />
      </div>
      <div className="sectionContainer row">
        <div className="col-md-8">
          <h1 className="w__700 mainColor text-uppercase">
            {username} Shopping History
          </h1>

          <Table
            columns={columns}
            dataSource={data}
            className="shadow-sm borderRaduis "
            
          />
        </div>

        <div
          className="col-md-4 borderRaduis shadow mainColorBack text-white mt-5 p-4"
          style={{ maxHeight: "200px" }}
        >
          <h2 className="zenDots mb-5">Summary</h2>
          <p className="d-flex align-content-center justify-content-between text-white-50 w__700 text-uppercase">
            total items <span className="text-white">{total}</span>
          </p>
          <p className="d-flex align-content-center justify-content-between text-white-50 w__700 text-uppercase mb-5">
            Total money spent <span className="text-white">$ {totalPrice}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
