import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { BACKEND_URL } from "../../constants";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import { RatingsComponent } from "./index";

const ProductDetailsComponent = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = (data) => {
    if (data.stock <= count) {
      toast.error("Product stock limited!");
    } else {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`${BACKEND_URL}${data.image}`}
                width="100%"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <div>
                <h1 className="h3 mb-4">{data.name}</h1>
                <p className="mb-3">{data.description}</p>
              </div>
              <div>
                <div className="d-flex align-items-center mb-3">
                  <h4 className="text-primary me-1">{data.discountPrice} $</h4>
                  <pre>
                    {data.originalPrice && (
                      <s className="text-danger">{data.originalPrice} $</s>
                    )}
                  </pre>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <button
                    className="btn btn-primary me-2"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="text-dark">{count}</span>
                  <button
                    className={`btn ${
                      data.stock <= count ? "btn-danger" : "btn-primary"
                    } btn ms-2`}
                    onClick={() => incrementCount(data)}
                  >
                    +
                  </button>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <RatingsComponent rating={data.rating} />
                  <p className="text-success">{data.soldOut} SOLD</p>
                </div>

                <div className="d-flex gap-2 justify-content-between">
                  <button
                    className="btn w-100 btn-primary d-flex align-items-center"
                    onClick={() => addToCartHandler(data?._id)}
                  >
                    Add to Cart <AiOutlineShoppingCart className="ms-2" />
                  </button>

                  <button
                    className={`btn ${
                      click ? "btn-danger" : "btn-outline-primary"
                    }`}
                    onClick={() =>
                      click
                        ? removeFromWishlistHandler(data)
                        : addToWishlistHandler(data)
                    }
                    title={click ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {click ? (
                      <AiFillHeart size={24} color="white" />
                    ) : (
                      <AiOutlineHeart size={24} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { ProductDetailsComponent };
