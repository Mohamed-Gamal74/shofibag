import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import Card from "../../commponents/card";
import styles from "./products.module.css";
import banner from "../../images/banner/b1.jpg";
import Loader from "../../commponents/loader";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("products")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setProducts(data);
      });
  }, []);

  return (
    <section className="pt-3 pb-5">
      <div className={`${styles.bannerContainer} mb-5 w-100 `}>
        <img src={banner} alt="banner" className="w-100" />
        <div className={`${styles.content} text-white text-center`}>
          <h2 className="w__700 zenDots">#stayhome</h2>
          <p>Save more with coupons & up to 70% off!</p>
        </div>
      </div>
      <div className="row sectionContainer mt-4">
        {products.length === 0 ? (
          <Loader />
        ) : (
          products.map((product) => {
            return (
              <div className="col-md-3" key={product.id}>
                <Card
                  img={product.image}
                  category={product.category}
                  title={product.name}
                  price={product.price}
                  id={product.id}
                />
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Products;
