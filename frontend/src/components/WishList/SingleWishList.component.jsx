import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";

import { BACKEND_URL } from "../../constants";

const SingleWishList = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
  formatCurrency,
}) => {
  const { image, name, originalPrice, discountPrice } = data;

  return (
    <div className="border-bottom px-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromWishlistHandler(data)}
          />
        </div>
        <img
          src={`${BACKEND_URL}${image}`}
          alt=""
          className="w-25 ms-2 me-2 rounded-5"
        />
        <div className="pl-2">
          <h5>{name}</h5>
          <p className="font-weight-normal fs-6 text-secondary">
            <s> {formatCurrency(originalPrice)} $</s>
          </p>
          <h4 className="font-weight-bold fs-5 pt-1 text-danger font-Roboto">
            {formatCurrency(discountPrice)} $
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            tile="Add to cart"
            className="cursor-pointer"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export { SingleWishList };
