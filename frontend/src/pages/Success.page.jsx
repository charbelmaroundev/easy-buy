import React from "react";
import { Link } from "react-router-dom";
import { CheckoutStepsComponent } from "../components/Checkout";
import { FooterComponent, HeaderComponent } from "../components/Layout";

const SuccessPage = () => {
  return (
    <>
      <HeaderComponent />
      <div className="container p-0">
        <CheckoutStepsComponent active={2} />
        <Success />
      </div>
    </>
  );
};

const Success = () => {
  return (
    <div
      className="mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", color: "#000000a1" }}>
        <h2 className="mb-3">Thank you for your order!</h2>
        <h5
          style={{
            fontSize: "25px",
            marginBottom: "1.4rem",
          }}
        >
          Your order is successful 😍
        </h5>
        <Link to="/" className="btn btn-primary w-100 mt-4">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export { SuccessPage };
