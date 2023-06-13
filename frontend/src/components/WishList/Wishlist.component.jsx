import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { SingleWishList } from "./SingleWishList.component";

import { RxCross1 } from "react-icons/rx";
import { RiHeartAddLine } from "react-icons/ri";

const WishlistComponent = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    toast.error(`${data.name} removed from wish list`);
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    toast.success(`${data.name} added successfully to cart`);
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
          <RiHeartAddLine size={25} className="me-2" />
          <h5 className="m-0 me-2 fs-5 fw-500">
            Wish List {wishlist && wishlist.length}{" "}
            {wishlist && wishlist.length <= 1 ? "item" : "items"}
          </h5>
          <RxCross1
            className="cursor-pointer"
            size={25}
            style={{
              position: "absolute",
              right: "10px",
            }}
            onClick={() => setOpenWishlist(false)}
          />
        </div>
      </div>
      <div className="offcanvas-body p-3 flex-grow-1">
        {wishlist &&
          wishlist.map((item, index) => (
            <SingleWishList
              key={index}
              data={item}
              removeFromWishlistHandler={removeFromWishlistHandler}
              addToCartHandler={addToCartHandler}
              formatCurrency={formatCurrency}
            />
          ))}
      </div>
    </div>
  );
};

export { WishlistComponent };
