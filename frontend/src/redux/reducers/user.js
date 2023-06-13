import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const startLoading = (state, key) => {
  state[key] = true;
};

const stopLoading = (state, key) => {
  state[key] = false;
};

const loadingFailed = (state, action) => {
  stopLoading(state, "loading");
  state.error = action.payload;
  state.isAuthenticated = false;
};

const loadingSuccess = (state, action, additionalChanges = {}) => {
  stopLoading(state, "loading");
  state.error = null;
  state.isAuthenticated = true;
  Object.assign(state, additionalChanges);
};

const addressLoadingSuccess = (state, action, additionalChanges = {}) => {
  stopLoading(state, "addressLoading");
  state.error = null;
  Object.assign(state, additionalChanges);
};

const addressLoadingFailed = (state, action) => {
  stopLoading(state, "addressLoading");
  state.error = action.payload;
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => startLoading(state, "loading"),
  LoadUserSuccess: (state, action) =>
    loadingSuccess(state, action, { user: action.payload }),
  LoadUserFail: loadingFailed,

  updateUserInfoRequest: (state) => startLoading(state, "loading"),
  updateUserInfoSuccess: (state, action) =>
    loadingSuccess(state, action, { user: action.payload }),
  updateUserInfoFailed: loadingFailed,

  updateUserAddressRequest: (state) => startLoading(state, "addressLoading"),
  updateUserAddressSuccess: (state, action) =>
    addressLoadingSuccess(state, action, {
      successMessage: action.payload.successMessage,
      user: action.payload.user,
    }),
  updateUserAddressFailed: addressLoadingFailed,

  deleteUserAddressRequest: (state) => startLoading(state, "addressLoading"),
  deleteUserAddressSuccess: (state, action) =>
    addressLoadingSuccess(state, action, {
      successMessage: action.payload.successMessage,
      user: action.payload.user,
    }),
  deleteUserAddressFailed: addressLoadingFailed,
});
