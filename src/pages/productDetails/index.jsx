import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import Loader from "../../commponents/loader";
import { Select, InputNumber } from "antd";
import { useUserAuth } from "../../store/auth-context";
import { useCart } from "../../store/cart-context";
import { ToastContainer } from "react-toastify";

import styles from "./productDetails.module.css";

const ProductDetails = () => {
  const { user } = useUserAuth();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const docRef = db.collection("products");
    const query = docRef.where("id", "==", +id);

    query.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setProduct(data[0]);
    });
  }, [id]);

  const onChange = (value) => {
    setQuantity(value);
  };

  const addToCartHandler = () => {
    addToCart(
      product.id,
      product.image,
      product.category,
      product.name,
      product.price,
      quantity,
      size
    );
  };

  return (
    <section
      className="py-5 sectionContainer mb-5 justify-content-center  d-flex align-items-center  "
      style={{ minHeight: "90vh" }}
    >
      {Object.keys(product).length === 0 ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-4 ">
            <div className={styles.imgContainer}>
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid borderRaduis"
              />
            </div>
          </div>
          <div className="col-md-7 ml-4">
            <p className="zenDots mainColor">Home / {product.category} </p>
            <h1 className="mb-3 w__700  ">{product.name}</h1>
            <h3 className="mb-5">$ {product.price}</h3>
            <Select
              defaultValue="S"
              className="mb-4"
              style={{ width: "100px" }}
              placeholder="Select Size"
              options={[
                { value: "S" },
                { value: "M" },
                { value: "L" },
                { value: "XL" },
              ]}
              onChange={(value) => setSize(value)}
            />
            <div className="d-flex align-items-center mb-5">
              <InputNumber
                style={{ width: "50px" }}
                min={1}
                max={10}
                defaultValue={1}
                onChange={onChange}
              />
              {user && (
                <button
                  className="btn mainColorBack text-white w__700 ml-5"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              )}
            </div>

            <div>
              <p className="w__700 zenDots ">Product Details</p>
              <p className="w-75">{product.Details}</p>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default ProductDetails;
