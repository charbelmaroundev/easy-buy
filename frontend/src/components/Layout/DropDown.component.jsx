import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DropDownCompoenent = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
  };

  return (
    <div
      className=" bg-white text-black position-absolute rounded-bottom-md shadow-sm"
      style={{ zIndex: "10" }}
    >
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="d-flex align-items-center my-1 border-bottom cursor-pointer"
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <p
              style={{ fontSize: ".8rem" }}
              className="m-2 cursor-pointer user-select-none"
            >
              {i.title}
            </p>
          </div>
        ))}
    </div>
  );
};

export { DropDownCompoenent };
