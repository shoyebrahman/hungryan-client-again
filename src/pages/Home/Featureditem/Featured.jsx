import featuredimg from "../../../../public/assets/home/featured.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white  pt-8 py-20">
      <SectionTitle
        subHeading={"Check it Out"}
        heading={"Featured Item"}
      ></SectionTitle>
      <div className="md:flex justify-center  bg-black/30 backdrop-blur-md space-x-5 items-center pb-20 pt-12 px-36">
        <div>
          <img src={featuredimg} alt="" />
        </div>
        <div>
          <p>Aug 20, 2029</p>
          <p className="uppercase">where can i get some?</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta id a
            perspiciatis voluptatibus? Impedit maxime pariatur hic quae
            veritatis animi suscipit harum! Veritatis debitis aut dolorum ut vel
            fugit eaque blanditiis, adipisci corporis soluta explicabo
            accusantium. Ut quasi hic, excepturi a inventore deserunt esse ullam
            error illo, accusantium repudiandae reiciendis.
          </p>
          <button className="btn btn-outline border-0 border-b-4">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
