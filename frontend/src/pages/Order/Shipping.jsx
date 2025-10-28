import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "../../components/ProgressSteps";
import countries from "../../data/countries";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [postal, setPostal] = useState(shippingAddress?.postalCode || "");
  const [payment, setPayment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    // ✅ Save shipping info & payment
    dispatch(
      saveShippingAddress({ address, city, country, postalCode: postal })
    );
    dispatch(savePaymentMethod(payment));

    // ✅ Navigate to next step
    navigate("/order");
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />

      <div className="items-center mt-10 justify-around flex flex-wrap">
        <form className="w-[35rem]" onSubmit={submitHandler}>
          <div className="mb-4">
            <label>Address</label>
            <input
              type="text"
              value={address}
              className="w-full py-2 border rounded"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>City</label>
            <input
              type="text"
              value={city}
              className="w-full py-2 border rounded"
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="py-2 w-full border rounded"
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label>Postal Code</label>
            <input
              type="text"
              value={postal}
              className="w-full py-2 border rounded"
              required
              onChange={(e) => setPostal(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Payment Method</label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="PayPal"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                />{" "}
                PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Stripe"
                  onChange={(e) => setPayment(e.target.value)}
                  disabled
                />{" "}
                Stripe
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mb-4 w-full bg-red-500 text-center py-2 rounded uppercase"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
