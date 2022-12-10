import feature1 from "../../images/features/f1.png";
import feature2 from "../../images/features/f2.png";
import feature3 from "../../images/features/f3.png";
import feature4 from "../../images/features/f4.png";
import feature5 from "../../images/features/f5.png";
import feature6 from "../../images/features/f6.png";

const Features = () => {
  return (
    <section className="py-5 sectionContainer  ">
      <div className="row ">
        <div className="col cardHover shadow borderRaduis text-center  py-2 mr-2">
          <div className="mb-4">
            <img src={feature1} alt="feature" />
          </div>
          <p className="text1" >Free Shipping</p>
        </div>
        <div className="col cardHover shadow borderRaduis text-center  py-2 mr-2">
          <div className="mb-4">
            <img src={feature2} alt="feature" />
          </div>
          <p className="text2" >Online Order</p>
        </div>
        <div className="col cardHover shadow borderRaduis text-center  py-2 mr-2">
          <div className="mb-4">
            <img src={feature3} alt="feature" />
          </div>
          <p className="text3"  >Save Money</p>
        </div>
        <div className="col cardHover shadow borderRaduis text-center  py-2 mr-2">
          <div className="mb-4">
            <img src={feature4} alt="feature" />
          </div>
          <p className="text4" >promotions</p>
        </div>
        <div className="col cardHover shadow borderRaduis text-center  py-2 mr-2">
          <div className="mb-4">
            <img src={feature5} alt="feature" />
          </div>
          <p className="text5" >Happy Sell</p>
        </div>
        <div className="col cardHover shadow borderRaduis text-center  py-2 mr-2 ">
          <div className="mb-4">
            <img src={feature6} alt="feature" />
          </div>
          <p className="text6" >F24/7 Support</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
