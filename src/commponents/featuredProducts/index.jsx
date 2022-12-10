import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import SkeletonComp from "../skeleton";

import Heading from "../heading";
import Card from "../card";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const docRef = db.collection("products");
    const query = docRef.where("info", "==", "feature");

    query.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setProducts(data);
    });
  }, []);

  return (
    <section className="py-5 sectionContainer">
      <Heading
        head="Featured Products"
        para="Summer Collection New Modern Design"
      />

      <div className="row">
        {products.length === 0 ? (
          <>
            <div className="col-md-3">
              <SkeletonComp />
            </div>
            <div className="col-md-3">
              <SkeletonComp />
            </div>
            <div className="col-md-3">
              <SkeletonComp />
            </div>
            <div className="col-md-3">
              <SkeletonComp />
            </div>
          </>
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

export default FeaturedProducts;
