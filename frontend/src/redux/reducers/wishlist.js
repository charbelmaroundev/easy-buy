import { createReducer } from "@reduxjs/toolkit";

const getInitialWishlistItems = () => {
  const wishlistItems = localStorage.getItem("wishlistItems");
  return wishlistItems ? JSON.parse(wishlistItems) : [];
};

const updateWishlistItems = (state, newItem) => {
  const isItemExist = state.wishlist.find((item) => item._id === newItem._id);
  if (isItemExist) {
    return state.wishlist.map((item) =>
      item._id === isItemExist._id ? newItem : item
    );
  } else {
    return [...state.wishlist, newItem];
  }
};

const initialState = {
  wishlist: getInitialWishlistItems(),
};

export const wishlistReducer = createReducer(initialState, {
  addToWishlist: (state, action) => {
    state.wishlist = updateWishlistItems(state, action.payload);
  },

  removeFromWishlist: (state, action) => {
    state.wishlist = state.wishlist.filter(
      (item) => item._id !== action.payload
    );
  },
});
