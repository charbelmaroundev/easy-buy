import React from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { SingleCartComponent } from "./index";

const CartComponent = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    toast.warning(`${data.name} removed from cart`);
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div
      className="bg-white border position-fixed h-100 d-flex flex-column"
      style={{
        top: 0,
        right: 0,
        zIndex: 10,
        overflow: "auto",
        minWidth: "20rem",
      }}
    >
      <div className="offcanvas-header border-bottom">
        <div className="d-flex align-items-center p-2">
          <IoBagHandleOutline size={25} className="me-2" />

          <h5 className="m-0 me-2 fs-5 fw-500">
            Cart {cart && cart.length}{" "}
            {cart && cart.length <= 1 ? "item" : "items"}
          </h5>

          <RxCross1
            size={25}
            className="cursor-pointer"
            style={{
              position: "absolute",
              right: "10px",
            }}
            onClick={() => setOpenCart(false)}
          />
        </div>
      </div>
      <div className="offcanvas-body p-3 flex-grow-1">
        {cart &&
          cart.map((item, index) => (
            <SingleCartComponent
              formatCurrency={formatCurrency}
              key={index}
              data={item}
              quantityChangeHandler={quantityChangeHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
      </div>
      {totalPrice ? (
        <div className="offcanvas-footer p-3 border-top">
          <div className="mt-auto">
            <Link to="/checkout" className="d-grid text-decoration-none">
              <button className="btn btn-danger">{`Checkout ${formatCurrency(
                totalPrice
              )}`}</button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { CartComponent };
