import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Secret from "../pages/Shared/Secret/Secret";
import Dashbord from "../Layout/Dashbord";
import Cart from "../pages/Dashbord/Cart/Cart";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllUser from "../pages/Dashbord/AllUser/AllUser";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/Dashbord/AddItems/AddItems";
import ManageItem from "../pages/Dashbord/ManageItem/ManageItem";
import UpdateItem from "../pages/Dashbord/UpdateItem/UpdateItem";
import Payment from "../pages/Dashbord/Payment/Payment";
import PaymentHistory from "../pages/Dashbord/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashbord/UserHome/UserHome";
import AdminHome from "../pages/Dashbord/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/secret",
        element: <Secret></Secret>,
      },
    ],
  },
  {
    path: "/dashbord",
    element: (
      <PrivateRoute>
        {" "}
        <Dashbord></Dashbord>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },

      //admin
      {
        path: "users",
        element: (
          <AdminRoute>
            {" "}
            <AllUser></AllUser>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "manageitem",
        element: (
          <AdminRoute>
            {" "}
            <ManageItem></ManageItem>
          </AdminRoute>
        ),
      },
      {
        path: "updateitem/:id",
        element: (
          <AdminRoute>
            {" "}
            <UpdateItem></UpdateItem>{" "}
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://hungryan-server.vercel.app/menu/${params.id}`),
      },
      {
        path: "additems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "userhome",
        element: <UserHome></UserHome>,
      },
      {
        path: "adminhome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
