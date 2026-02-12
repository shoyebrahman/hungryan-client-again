import { Helmet } from "react-helmet";
import Cover from "../Shared/Cover/Cover";
import menuImg from "../../../public/assets/menu/banner3.jpg";
import dessertImg from "../../../public/assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../public/assets/menu/pizza-bg.jpg";
import soupImg from "../../../public/assets/menu/soup-bg.jpg";
import saladImg from "../../../public/assets/menu/salad-bg.jpg";

import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";
import useMenu from "../../Hooks/useMenu";
const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Hungryan | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="our menu"></Cover>
      {/* main cover */}
      <SectionTitle
        subHeading="Dont Miss"
        heading="Todays Offer"
      ></SectionTitle>
      {/* offered menu items */}

      <MenuCategory items={offered}></MenuCategory>

      {/* dessert menu item */}
      <MenuCategory
        items={dessert}
        title="dessert"
        Img={dessertImg}
      ></MenuCategory>
      {/* Soup menu item */}
      <MenuCategory items={soup} title="soup" Img={soupImg}></MenuCategory>
      {/* pizza menu item */}
      <MenuCategory items={pizza} title="pizza" Img={pizzaImg}></MenuCategory>
      {/* salad menu item */}
      <MenuCategory items={salad} title="salad" Img={saladImg}></MenuCategory>
    </div>
  );
};

export default Menu;
