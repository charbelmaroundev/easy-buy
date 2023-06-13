import React from "react";
import { NavbarComponent } from "./index";

const FooterComponent = ({ activeHeading }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="page-footer bg-primary text-white pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-6">
            <h5 className="text-uppercase">EASY BUY</h5>

            <p>
              Experience convenient shopping at EasyBuy Ecommerce, where quality
              meets affordability.
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-6 mb-md-0 mb-6">
            {/* <h5 className="text-uppercase">Links</h5> */}
            <NavbarComponent
              active={activeHeading}
              direction={"flex-column"}
              color={"white"}
            />
          </div>
        </div>
      </div>

      <div className="text-center py-3">
        <span className="text-white">&copy; {year}</span> | All rights reserved
      </div>
    </footer>
  );
};

export { FooterComponent };
