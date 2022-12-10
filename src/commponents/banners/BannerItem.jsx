import styles from "./banners.module.css";

const BannerItem = ({img , header , info , paragraph , colorPara }) => {
  return (
    <div className={styles.container}>
    <div className={styles.imgContainer}>
      <img src={img} alt="banner" />
    </div>
    <div className={styles.content}>
      <p className="zenDots text-white-50">{header}</p>
      <h3 className="w__700">{info}</h3>
      <p>{paragraph}</p>
      <h4 className="w__700 mainColor" >{colorPara}</h4>
    </div>
  </div>
  )
}

export default BannerItem