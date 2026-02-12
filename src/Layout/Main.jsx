import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeaderfoter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div>
      {noHeaderfoter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderfoter || <Footer></Footer>}
    </div>
  );
};

export default Main;
