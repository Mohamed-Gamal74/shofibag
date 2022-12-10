import styles from "./loader.module.css";

const Loader = () => {
  return (
    <section className="d-flex align-items-center justify-content-center w-100 my-5" >
      <div className={styles.dots}>
        <span style={{ "--i": "1" }}></span>
        <span style={{ "--i": "2" }}></span>
        <span style={{ "--i": "3" }}></span>
        <span style={{ "--i": "4" }}></span>
        <span style={{ "--i": "5" }}></span>
        <span style={{ "--i": "6" }}></span>
        <span style={{ "--i": "7" }}></span>
        <span style={{ "--i": "8" }}></span>
        <span style={{ "--i": "9" }}></span>
        <span style={{ "--i": "10" }}></span>
        <span style={{ "--i": "11" }}></span>
        <span style={{ "--i": "12" }}></span>
        <span style={{ "--i": "13" }}></span>
        <span style={{ "--i": "14" }}></span>
        <span style={{ "--i": "15" }}></span>
      </div>
    </section>
  );
};

export default Loader;
