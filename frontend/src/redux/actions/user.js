import axios from "axios";
import { SERVER } from "../../constants";

const dispatchAction = (dispatch, type, payload) => {
  dispatch({
    type,
    payload,
  });
};

const handleErrors = (error, dispatch, type) => {
  dispatchAction(dispatch, type, error.response.data.message);
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatchAction(dispatch, "LoadUserRequest");

    const { data } = await axios.get(`${SERVER}/user/getuser`, {
      withCredentials: true,
    });

    dispatchAction(dispatch, "LoadUserSuccess", data.user);
  } catch (error) {
    handleErrors(error, dispatch, "LoadUserFail");
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatchAction(dispatch, "updateUserInfoRequest");

      const { data } = await axios.put(
        `${SERVER}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatchAction(dispatch, "updateUserInfoSuccess", data.user);
    } catch (error) {
      handleErrors(error, dispatch, "updateUserInfoFailed");
    }
  };

// update user address
export const updatUserAddress =
  (country, city, address) => async (dispatch) => {
    try {
      dispatchAction(dispatch, "updateUserAddressRequest");

      const { data } = await axios.put(
        `${SERVER}/user/update-user-addresses`,
        {
          country,
          city,
          address,
        },
        { withCredentials: true }
      );

      dispatchAction(dispatch, "updateUserAddressSuccess", {
        successMessage: "User address added succesfully!",
        user: data.user,
      });
    } catch (error) {
      handleErrors(error, dispatch, "updateUserAddressFailed");
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatchAction(dispatch, "deleteUserAddressRequest");

    const { data } = await axios.delete(
      `${SERVER}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatchAction(dispatch, "deleteUserAddressSuccess", {
      successMessage: "Address deleted successfully!",
      user: data.user,
    });
  } catch (error) {
    handleErrors(error, dispatch, "deleteUserAddressFailed");
  }
};
