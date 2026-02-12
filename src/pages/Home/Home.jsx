//import Menuitem from "../Shared/Menuitem/Menuitem";
import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Catagory from "./Catagory/Catagory";
import Featured from "./Featureditem/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Hungryan | Home</title>
      </Helmet>
      <Banner></Banner>
      <Catagory></Catagory>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
