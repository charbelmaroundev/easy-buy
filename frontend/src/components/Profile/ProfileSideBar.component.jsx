import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { SERVER } from "../../constants";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileSideBarComponent = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${SERVER}/user/logout`, {
        withCredentials: true,
      });

      navigate("/login");
      window.location.reload();
      // toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.messagge);
    }
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-10 py-3 pt-8">
      <div
        className={`d-flex align-items-center cursor-pointer w-full py-1 px-0 cursor-pointer ${
          active === 1 ? "btn btn-primary" : ""
        }`}
        onClick={() => setActive(1)}
      >
        <div>
          <RxPerson size={20} color={active === 1 ? "white" : ""} />
        </div>
        <span className="mx-3 d-none d-md-block">Profile</span>
      </div>

      <div
        className={`d-flex align-items-center cursor-pointer w-full py-1 px-0 cursor-pointer ${
          active === 2 ? "btn btn-primary" : ""
        }`}
        onClick={() => setActive(2)}
      >
        <div>
          <RiLockPasswordLine size={20} color={active === 2 ? "white" : ""} />
        </div>
        <span className="mx-2 d-none d-md-block">Change Password</span>
      </div>

      <div
        className={`d-flex align-items-center cursor-pointer w-full py-1  px-0 cursor-pointer ${
          active === 3 ? "btn btn-primary" : ""
        }`}
        onClick={() => setActive(3)}
      >
        <div>
          <TbAddressBook size={20} color={active === 3 ? "white" : ""} />
        </div>
        <span className="mx-3 d-none d-md-block">Address</span>
      </div>

      <div
        className={`d-flex align-items-center cursor-pointer w-full py-1  px-0 cursor-pointer ${
          active === 4 ? "btn btn-primary" : ""
        }`}
        onClick={logoutHandler}
      >
        <div>
          <AiOutlineLogin size={20} color={active === 4 ? "white" : ""} />
        </div>
        <span className="mx-3 d-none d-md-block">Log out</span>
      </div>
    </div>
  );
};

export { ProfileSideBarComponent };
