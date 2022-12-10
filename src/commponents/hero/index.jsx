import styles from "./hero.module.css";
import banner from "../../images/banner.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <section
      className={`${styles.sectionContainer}  d-flex align-items-center justify-content-center p-5 `}
    >
      <div className="row ">
        <div className="col px-5  align-self-center">
          <b className="text-black-50">Trade-in-offer</b>
          <h1 className="mb-4">
            Super Value Deals <br />
            <span className="mainColor">On All Products</span>
          </h1>
          <button
            className="btn w__700 text-white mainColorBack px-5 py-2 "
            onClick={handleShopNow}
          >
            Shop Now
          </button>
        </div>
        <div className={`${styles.imgContainer} col `}>
          <img src={banner} alt="hero" className="w-100" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
