import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { RatingsComponent } from "../Products/Ratings.component";
import { BACKEND_URL } from "../../constants";

const ProductCardComponent = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

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
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const {
    _id,
    image,
    name,
    description,
    rating,
    originalPrice,
    discountPrice,
    soldOut,
  } = data;

  return (
    <>
      <div className="p-0 py-4 pe-2 col">
        <div className="card border-0">
          <div className="position-relative">
            <img
              src={`${BACKEND_URL}${image}`}
              alt=""
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="position-absolute top-0 end-0 m-2">
              {click ? (
                <AiFillHeart
                  className="mb-2 text-danger cursor-pointer"
                  size={22}
                  onClick={() => removeFromWishlistHandler(data)}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  className="mb-2 text-muted cursor-pointer"
                  size={22}
                  onClick={() => addToWishlistHandler(data)}
                  title="Add to wishlist"
                />
              )}
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              {description.length > 40
                ? description.slice(0, 40) + "..."
                : description}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <RatingsComponent rating={rating} />
              <div>
                <h6 className="mb-0">
                  {originalPrice === 0 ? originalPrice : discountPrice}$
                </h6>
                {originalPrice && (
                  <s className="text-muted">{originalPrice}$</s>
                )}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-success">{soldOut} sold</span>
              <div>
                <Link to={`/product/${_id}`}>
                  <AiOutlineEye
                    className="me-2 text-muted cursor-pointer"
                    size={22}
                    title="Quick view"
                  />
                </Link>
                <AiOutlineShoppingCart
                  size={22}
                  onClick={() => addToCartHandler(_id)}
                  title="Add to cart"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductCardComponent };
