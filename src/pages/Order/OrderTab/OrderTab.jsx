import { Link } from "react-router-dom";
import FoodCart from "../../../components/FoodCart/FoodCart";

const OrderTab = ({ items }) => {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-10">
        {items.map((item) => (
          <FoodCart key={item._id} item={item}></FoodCart>
        ))}
      </div>
      <Link to="/order">
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default OrderTab;
