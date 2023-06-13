import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../constants";

const SingleCartComponent = ({
  data,
  quantityChangeHandler,
  removeFromCartHandler,
  formatCurrency,
}) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  const { qty, image, name } = data;

  return (
    <div className="border-bottom px-3">
      <div className="row d-flex justify-content-between align-items-center ">
        <div className="col-2 d-flex align-items-center ">
          <div
            className="bg-secondary border border-secondary rounded-circle d-flex align-items-center justify-content-center h-100 cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus className="cursor-pointer" size={22} color="#fff" />
          </div>
          <span className="px-2">{qty}</span>
          <div
            className="bg-danger border border-danger rounded-circle d-flex align-items-center justify-content-center h-100 cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus className="cursor-pointer" size={22} color="#fff" />
          </div>
        </div>
        <div className="col-6">
          <img
            src={`${BACKEND_URL}${image}`}
            alt=""
            className="w-25 ms-2 me-2 rounded-5"
          />
        </div>
        <div className="pl-2 col-3">
          <h5>{name}</h5>
          <h4 className="font-weight-bold fs-5 pt-1 text-danger font-Roboto">
            {formatCurrency(totalPrice)}
          </h4>
        </div>
        <div className="col-1">
          <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export { SingleCartComponent };
