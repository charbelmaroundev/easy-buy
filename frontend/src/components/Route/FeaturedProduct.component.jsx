import React from "react";
import { ProductCardComponent } from "./index";
import { useSelector } from "react-redux";

const FeaturedProductComponent = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div className="container">
      <div className="py-2">
        <h1>Features Product</h1>
        <div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {allProducts && allProducts.length !== 0 && (
              <>
                {allProducts &&
                  allProducts.map((i, index) => (
                    <ProductCardComponent data={i} key={index} />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { FeaturedProductComponent };
