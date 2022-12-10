import Banners from "../../commponents/banners";
import FeaturedProducts from "../../commponents/featuredProducts";
import Features from "../../commponents/features";
import HeroSection from "../../commponents/hero";
import NewProducts from "../../commponents/newProducts";
import SaveSection from "../../commponents/save";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <FeaturedProducts />
      <SaveSection />
      <NewProducts />
      <Banners />
    </>
  );
};

export default Home;
