import axios from "axios";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER } from "../../constants";

const ChangePasswordComponent = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${SERVER}/user/update-user-password`,
        { currentPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );

      toast.success(res.data.success);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container p-0 ps-4">
      <h2 className="text-center mb-4">Change Password</h2>
      <form onSubmit={passwordChangeHandler}>
        <div className="mb-2">
          <div className="input-group position-relative">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              className="form-control box-shadow-none"
              style={{ borderRadius: 4 }}
              id="currentPassword"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="currentPassword"
              required
            />
            <button
              type="button"
              className="btn btn-link rounded position-absolute end-0 box-shadow-none"
              style={{
                zIndex: 5,
              }}
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            >
              {currentPasswordVisible ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          </div>
        </div>
        <div className="mb-2">
          <div className="input-group position-relative">
            <input
              type={newPasswordVisible ? "text" : "password"}
              className="form-control box-shadow-none"
              style={{ borderRadius: 4 }}
              id="newPassword"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="newPassword"
              required
            />
            <button
              type="button"
              className="btn btn-link rounded position-absolute end-0 box-shadow-none"
              style={{
                zIndex: 5,
              }}
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            >
              {newPasswordVisible ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          </div>
        </div>
        <div className="mb-2">
          <div className="input-group position-relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="form-control box-shadow-none"
              style={{ borderRadius: 4 }}
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="confirmPassword"
              required
            />
            <button
              type="button"
              className="btn btn-link rounded position-absolute end-0 box-shadow-none"
              style={{
                zIndex: 5,
              }}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-2">
          Change Password
        </button>
      </form>
    </div>
  );
};

export { ChangePasswordComponent };
