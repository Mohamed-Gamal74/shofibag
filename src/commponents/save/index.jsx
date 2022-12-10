import styles from "./saveSection.module.css";
import { useNavigate } from "react-router-dom";

const SaveSection = () => {

  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/products");
  };

  return (
    <section className={`${styles.Container} py-5`}>
      <div className="text-center text-white py-5 w__700" >
        <p>Repair Services</p>
        <h4 className="mb-5" >
          Up to <span className="mainColor w__700 zenDots" >70% Off</span> - All T-Shirts & Accessories{" "}
        </h4>
        <button className="btn mainColorBack text-white w__700 " onClick={handleExplore} >Explore More</button>
      </div>
    </section>
  );
};

export default SaveSection;
