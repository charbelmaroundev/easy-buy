import { createReducer } from "@reduxjs/toolkit";

const getInitialCartItems = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const updateCartItems = (state, newItem) => {
  const isItemExist = state.cart.find((item) => item._id === newItem._id);
  if (isItemExist) {
    return state.cart.map((item) =>
      item._id === isItemExist._id ? newItem : item
    );
  } else {
    return [...state.cart, newItem];
  }
};

const initialState = {
  cart: getInitialCartItems(),
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    state.cart = updateCartItems(state, action.payload);
  },

  removeFromCart: (state, action) => {
    state.cart = state.cart.filter((item) => item._id !== action.payload);
  },
});
