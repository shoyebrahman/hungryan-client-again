import React from "react";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashbord = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen text-black bg-orange-400">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashbord/adminhome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/additems">
                  <FaUtensils></FaUtensils>
                  Add Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/manageitem">
                  <FaList></FaList>
                  Manage Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/users">
                  <FaUser></FaUser>
                  All User
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashbord/userhome">
                  <FaHome></FaHome>
                  UserHome
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/paymenthistory">
                  <FaCalendar></FaCalendar>
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/cart">
                  <FaShoppingCart></FaShoppingCart>
                  MyCart
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/review">
                  <FaAd></FaAd>
                  Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/booking">
                  <FaShoppingCart></FaShoppingCart>
                  MyBooking
                </NavLink>
              </li>
            </>
          )}
          {/* shared */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch></FaSearch>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaEnvelope></FaEnvelope>
              Contuct
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashbord;
