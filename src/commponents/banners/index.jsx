import ban1 from "../../images/banner/b17.jpg";
import ban2 from "../../images/banner/b10.jpg";
import ban3 from "../../images/banner/b7.jpg";
import ban4 from "../../images/banner/b4.jpg";
import ban5 from "../../images/banner/b18.jpg";
import BannerItem from "./BannerItem";

const Banners = () => {
  return (
    <section className="py-5 sectionContainer text-white">
      <div className="row">
        <div className="col-md-6 mb-4">
          <BannerItem
            img={ban1}
            info="buy 1 get 1 free"
            header="Crazy Deals"
            paragraph="The best Classic Dress is on sale at Shofibag"
          />
        </div>

        <div className="col-md-6 mb-4">
          <BannerItem
            img={ban2}
            info="Upcoming Season"
            header="Spring/Summer"
            paragraph="The best Classic Dress is on sale at Shofibag"
          />
        </div>

        <div className="col-md-4">
          <BannerItem img={ban3} info="Seasonal Sale" colorPara='Winter Collection-50% OFF' />
        </div>

        <div className="col-md-4">
          <BannerItem img={ban4} info="New footwears Collection" colorPara='Spring/Summer 2023' />
        </div>

        <div className="col-md-4">
          <BannerItem img={ban5} info="T-shirts" colorPara='New Trendy Prints' />
        </div>
      </div>
    </section>
  );
};

export default Banners;
