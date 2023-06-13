import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

import { SERVER } from "../../constants";
import axios from "axios";
import { toast } from "react-toastify";

const SignupComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${SERVER}/user/signup`, {
        email,
        password,
        name,
      });

      toast.success(res.data.message);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-muted">
      <div style={{ width: "35rem" }} className="max-w-md">
        <h3 className="text-center mb-4">Register</h3>
        <div className="bg-white p-4 shadow">
          <form onSubmit={handleSignup}>
            <div className="mb-2">
              <div className="input-group">
                <input
                  type="name"
                  className="form-control box-shadow-none"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

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
                  style={{ borderRadius: 4 }}
                  className="form-control box-shadow-none"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 box-shadow-none"
                  style={{ zIndex: 10 }}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2 mb-1">
              Sign up
            </button>

            <div className="d-flex justify-content-center">
              <span className="me-1">Already have an account?</span>
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { SignupComponent };
