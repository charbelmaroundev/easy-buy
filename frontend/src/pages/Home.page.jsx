import React from "react";
import { Link } from "react-router-dom";
import {
  FeaturedProductComponent,
  BestDealsComponent,
} from "../components/Route";
import { FooterComponent, HeaderComponent } from "../components/Layout";

const HomePage = () => {
  const backgroundImageUrl =
    "https://www.qeretail.com/blog/wp-content/uploads/2018/07/hero-image.jpg";
  return (
    <div>
      <HeaderComponent activeHeading={1} />

      <div
        className="hero bg-primary text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Welcome to our Website</h1>
              <p>Discover amazing deals and shop your favorite products</p>
              <Link to="/products" className="btn btn-light btn-lg">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BestDealsComponent />
      {/* <Events /> */}
      <FeaturedProductComponent />
      <FooterComponent activeHeading={1} />
    </div>
  );
};

export { HomePage };
