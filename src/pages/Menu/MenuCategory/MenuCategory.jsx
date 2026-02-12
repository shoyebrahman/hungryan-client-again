import React from "react";
import Menuitem from "../../Shared/Menuitem/Menuitem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, Img }) => {
  return (
    <div className="pt-8">
      {title && <Cover img={Img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-10 mt-16">
        {items.map((item) => (
          <Menuitem key={item._id} item={item}></Menuitem>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
