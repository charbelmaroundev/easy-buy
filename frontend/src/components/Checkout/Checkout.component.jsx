import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { removeFromCart } from "../../redux/actions/cart";
import { CartDataComponent } from "./CartData.component";
import { ShippingInfoComponent } from "./index";

const CheckoutComponent = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address, setAddress] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (address === "" || country === "" || city === "") {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        country,
        city,
        address,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      cart.forEach((item) => {
        dispatch(removeFromCart(item));
      });
      navigate("/success");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const totalPrice = (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-100 my-5 d-flex flex-column align-items-center ">
      <div className="w-90% w-100 :w-70% d-block 800px:d-flex">
        <div className="w-full 800px:w-65%">
          <ShippingInfoComponent
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address={address}
            setAddress={setAddress}
          />
        </div>
        <div className="w-full 800px:w-35% 800px:mt-0 mt-8">
          <CartDataComponent
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
          />
        </div>
      </div>
      <div className="d-grid gap-2 col-6 col-md-4 mx-auto mt-4 w-100">
        <button className="btn btn-primary" onClick={paymentSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export { CheckoutComponent };
