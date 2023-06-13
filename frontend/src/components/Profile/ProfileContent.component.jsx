import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AddressComponent,
  ChangePassword,
  ChangePasswordComponent,
} from "./index";
import {
  deleteUserAddress,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";

const ProfileContentComponent = ({ active }) => {
  const navigate = useNavigate();

  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, user.email, phoneNumber, password));
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="container pe-0">
            <h2 className="text-center mb-4">Update Your Profile</h2>

            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control box-shadow-none"
                  id="name"
                  required
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  disabled
                  value={user.email}
                />
              </div>
              <div className="mb-2">
                <input
                  type="tel"
                  className="form-control box-shadow-none"
                  id="phoneNumber"
                  required
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <div className="input-group position-relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control box-shadow-none"
                    style={{ borderRadius: 4 }}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link rounded position-absolute end-0 box-shadow-none"
                    style={{
                      zIndex: 5,
                    }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-2 w-100">
                Update
              </button>
            </form>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <ChangePasswordComponent />
        </div>
      )}

      {active === 3 && (
        <div>
          <AddressComponent />
        </div>
      )}
    </div>
  );
};

export { ProfileContentComponent };
