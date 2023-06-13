import React from "react";

const CheckoutStepsComponent = ({ active }) => {
  return (
    <div className="w-full mt-4">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
          role="progressbar"
          style={{ width: "50%" }}
        >
          Shipping
        </div>
        <div
          className={`progress-bar progress-bar-striped progress-bar-animated  ${
            active > 1 ? "bg-primary" : "bg-light"
          }`}
          role="progressbar"
          style={{ width: active > 1 ? "50%" : "0%" }}
        >
          Success
        </div>
      </div>
    </div>
  );
};

export { CheckoutStepsComponent };
