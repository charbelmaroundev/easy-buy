import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SERVER } from "../../constants";
import axios from "axios";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${SERVER}/user/login`,
        {
          email,
          password,
        },

        { withCredentials: true }
      );

      navigate("/");
      // I know that it is not a good way to reload the page
      window.location.reload();
      // toast.success("You are logged in!");

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-muted">
      <div style={{ width: "35rem" }} className="max-w-md">
        <h3 className="text-center mb-4">Login to your account</h3>
        <div className="bg-white p-4 shadow">
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control box-shadow-none"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="input-group position-relative">
                <input
                  type={visible ? "text" : "password"}
                  className="form-control box-shadow-none"
                  style={{ borderRadius: 4 }}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-link rounded position-absolute end-0 box-shadow-none"
                  style={{
                    zIndex: 10,
                  }}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2 mb-1">
              Log in
            </button>

            <div className="d-flex justify-content-center">
              <span className="me-1">Don't have an account?</span>
              <Link to="/sign-up" className="text-primary">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { LoginComponent };
