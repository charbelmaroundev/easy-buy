import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const NavbarComponent = ({ active, direction, color }) => {
  return (
    <div className={`${direction} d-block d-md-flex justify-content-between`}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex" key={index}>
            <Link
              to={item.url}
              className={`${
                active === index + 1 ? "text-warning" : `text-${color}`
              } pb-3 pb-md-0 font-weight-500 px-2 cursor-pointer text-decoration-none`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export { NavbarComponent };
