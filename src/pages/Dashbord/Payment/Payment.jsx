import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
//console.log(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading={"Payment"}
        subHeading={"Pay to Eat"}
      ></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
