import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductCardComponent } from "../Route";

const SuggestedProductComponent = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const d =
      allProducts &&
      allProducts
        .filter((i) => i.category === data.category && i._id != data._id)
        .slice(0, 5);

    setProductData(d);
  }, [data]);

  return (
    <div>
      {data ? (
        <div className={`mb-4`}>
          <h2 className={` text-[25px] font-[500] border-b mb-5`}>
            Related Product
          </h2>

          <div className="row border row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {productData &&
              productData.map((item, index) => (
                <ProductCardComponent data={item} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { SuggestedProductComponent };
