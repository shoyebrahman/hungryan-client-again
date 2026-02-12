import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { TiShoppingCart } from "react-icons/ti";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const [isAdmin] = useAdmin();
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const handlelogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order</Link>
      </li>
      {user && isAdmin && (
        <li>
          <Link to="/dashbord/adminhome">Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/dashbord/userhome"> Dashbord</Link>
        </li>
      )}
      <li>
        <Link to="/dashbord/cart">
          <button className="btn">
            <TiShoppingCart />
            <div className="badge badge-sm badge-secondary">
              {" "}
              +{cart.length}{" "}
            </div>
          </button>
        </Link>
      </li>

      {user ? (
        <li>
          {/* { <p> {user?.displayName}</p>{" "}} */}
          <button onClick={handlelogout}>Logout</button>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar fixed z-10 bg-black/30 backdrop-blur-md max-w-screen-xl text-white ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Hungryan</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
