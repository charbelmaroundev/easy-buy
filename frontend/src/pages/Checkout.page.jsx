import React from "react";
import {
  CheckoutComponent,
  CheckoutStepsComponent,
} from "../components/Checkout";
import { FooterComponent, HeaderComponent } from "../components/Layout";

const CheckoutPage = () => {
  return (
    <>
      <HeaderComponent />
      <div className="container p-0">
        <CheckoutStepsComponent active={1} />
        <CheckoutComponent />
      </div>
      <FooterComponent />
    </>
  );
};

export { CheckoutPage };
