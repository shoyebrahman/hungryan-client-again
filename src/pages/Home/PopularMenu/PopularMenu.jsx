import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Menuitem from "../../Shared/Menuitem/Menuitem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <div>
      <section className="mb-12">
        <SectionTitle
          subHeading={"From our Menu"}
          heading={"Our Popular Menu"}
        ></SectionTitle>

        <div className="grid md:grid-cols-2 gap-10">
          {popular.map((item) => (
            <Menuitem key={item._id} item={item}></Menuitem>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularMenu;
