import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL, SERVER } from "../../constants";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { NavbarComponent, DropDownCompoenent } from "./index";
import { WishlistComponent } from "../WishList";
import { CartComponent } from "../Cart";
import logoSrc from "../../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";

const HeaderComponent = ({ activeHeading }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setSearchData(null);
    } else {
      const filteredProducts =
        allProducts &&
        allProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );

      setSearchData(filteredProducts);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="container py-1 px-1 d-none d-md-block">
        <div className="d-flex justify-content-between">
          <div>
            <Link to="/">
              <img width={150} src={logoSrc} alt="logo" />
            </Link>
          </div>
          <div className="row">
            <div className="input-group input-group-sm position-relative">
              <input
                type="text"
                placeholder="Search Product..."
                className="form-control box-shadow-none rounded-pill border-1 px-3"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="col-lg-12">
              {searchData && searchData.length !== 0 ? (
                <div
                  className="position-absolute shadow bg-white p-2 ms-2"
                  style={{ maxWidth: "20rem", minWidth: "16rem", zIndex: 10 }}
                >
                  {searchData &&
                    searchData.map((data, index) => {
                      const { _id, image, name, description } = data;
                      return (
                        <Link
                          key={index}
                          to={`/product/${_id}`}
                          className="text-decoration-none text-black"
                        >
                          <div className="d-flex align-items-center my-2">
                            <div
                              className="rounded-circle overflow-hidden"
                              style={{ width: "2.5rem", height: "2.5rem" }}
                            >
                              <img
                                src={`${BACKEND_URL}${image}`}
                                alt={image}
                                className="w-100 h-100 object-cover"
                              />
                            </div>
                            <div className="ms-3 flex-grow-1">
                              <h5
                                className="mb-1 text-truncate"
                                style={{ maxWidth: "15rem" }}
                              >
                                {truncateText(name, 50)}
                              </h5>
                              <p
                                className="mb-0 text-truncate"
                                style={{
                                  maxWidth: "15rem",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {truncateText(description, 75)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "position-fixed top-0 right-0" : null
        } section w-100 d-flex justify-content-between bg-primary p-2 text-white align-items-center`}
        style={{ zIndex: 5 }}
      >
        {/* categories */}
        <div className="container p-0 d-flex align-items-center justify-content-between ">
          <div
            className="d-none d-md-block"
            onClick={() => setDropDown(!dropDown)}
          >
            <div className="position-relative">
              <button className="btn btn-light w-100 pl-3 rounded-top-md border cursor-pointer shadow-none">
                <BiMenuAltLeft size={25} className="me-2" />
                All Categories
                <IoIosArrowDown size={20} className="ms-2" />
              </button>
              {dropDown && (
                <DropDownCompoenent
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          {open || openCart || openWishlist ? (
            <div
              style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "gray",
                zIndex: 9,
                position: "fixed",
                top: 0,
                right: 0,
                opacity: "0.5",
              }}
            ></div>
          ) : null}

          {/* navitems */}
          <div className="d-flex align-items-center d-none d-md-block">
            <NavbarComponent
              active={activeHeading}
              direction={"flex-row"}
              color="white"
            />
          </div>

          <div className="d-block d-md-none" onClick={() => setOpen(!open)}>
            <RxHamburgerMenu />
          </div>

          <div className="d-block d-md-none">
            <Link to="/">
              <img
                style={{ borderRadius: "5px" }}
                width={150}
                src={logoSrc}
                alt=""
              />
            </Link>
          </div>

          <div className="d-flex">
            <div
              className="d-flex align-items-center"
              style={{ marginRight: "1rem" }}
            >
              <div
                className="cursor-pointer position-relative"
                onClick={() => setOpenWishlist(true)}
                style={{ fontSize: ".8rem" }}
              >
                <AiOutlineHeart size={25} color="white" className="clickable" />
                <span className="position-absolute translate-middle badge rounded-circle bg-warning">
                  <span className="text-dark">
                    {wishlist && wishlist.length}
                  </span>
                </span>
              </div>
            </div>

            <div
              className="d-flex align-items-center"
              style={{ marginRight: "1rem" }}
            >
              <div
                className="cursor-pointer position-relative"
                onClick={() => setOpenCart(true)}
                style={{ fontSize: ".8rem" }}
              >
                <AiOutlineShoppingCart size={25} color="white" />
                <span className="position-absolute translate-middle badge rounded-circle bg-warning">
                  <span className="text-dark">{cart && cart.length}</span>
                </span>
              </div>
            </div>

            <div
              className="d-flex cursor-pointer align-items-center d-none d-md-block"
              style={{ fontSize: ".8rem" }}
            >
              <div className="position-relative ">
                <Link to={isAuthenticated ? "/profile" : "/login"}>
                  <CgProfile
                    size={25}
                    color={activeHeading === 4 ? "#ffc107" : "white"}
                  />
                </Link>
              </div>
            </div>

            <div className="text-dark">
              {openWishlist ? (
                <WishlistComponent setOpenWishlist={setOpenWishlist} />
              ) : null}

              {openCart ? <CartComponent setOpenCart={setOpenCart} /> : null}

              {open ? (
                <div
                  className="bg-white border position-fixed h-100 d-flex flex-column"
                  style={{
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    overflow: "auto",
                    minWidth: "20rem",
                  }}
                >
                  <div className="offcanvas-header border-bottom p-1">
                    <div className="d-flex justify-content-between align-items-center p-2">
                      <div
                        className="d-flex cursor-pointer align-items-center me-4"
                        style={{ fontSize: ".8rem" }}
                      >
                        <div className="position-relative ">
                          <Link to={isAuthenticated ? "/profile" : "/login"}>
                            <CgProfile
                              size={25}
                              color={activeHeading === 4 ? "#ffc107" : "black"}
                            />
                          </Link>
                        </div>
                      </div>

                      <div onClick={() => setDropDown(!dropDown)}>
                        <div className="position-relative">
                          <button className="btn btn-light w-100 pl-3 rounded-top-md border cursor-pointer shadow-none">
                            <BiMenuAltLeft size={25} className="me-2" />
                            All Categories
                            <IoIosArrowDown size={20} className="ms-2" />
                          </button>
                          {dropDown && (
                            <DropDownCompoenent
                              categoriesData={categoriesData}
                              setDropDown={setDropDown}
                            />
                          )}
                        </div>
                      </div>

                      <RxCross1
                        size={25}
                        style={{
                          position: "absolute",
                          right: "10px",
                        }}
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                  </div>

                  <div className="offcanvas-body d-flex justify-content-center p-3 flex-grow-1">
                    <NavbarComponent
                      active={activeHeading}
                      direction={"flex-column"}
                      color="black"
                    />
                  </div>

                  {isAuthenticated ? null : (
                    <div className="offcanvas-footer p-3 border-top">
                      <div className="mt-auto">
                        <Link
                          to="/login"
                          className="d-grid text-decoration-none mb-1"
                        >
                          <button className="btn btn-danger">Log in</button>
                        </Link>

                        <Link
                          to="/sign-up"
                          className="d-grid text-decoration-none"
                        >
                          <button className="btn btn-danger">Sign up</button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { HeaderComponent };
