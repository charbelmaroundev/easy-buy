import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const startLoading = (state) => {
  state.isLoading = true;
};

const loadingFailed = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.success = false;
};

const loadingSuccess = (state, action, additionalChanges = {}) => {
  state.isLoading = false;
  state.error = null;
  state.success = true;
  Object.assign(state, additionalChanges);
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: startLoading,
  productCreateSuccess: (state, action) =>
    loadingSuccess(state, action, { product: action.payload }),
  productCreateFail: loadingFailed,

  getAllProductsRequest: startLoading,
  getAllProductsSuccess: (state, action) =>
    loadingSuccess(state, action, { allProducts: action.payload }),
  getAllProductsFailed: loadingFailed,

  clearErrors: (state) => {
    state.error = null;
  },
});
