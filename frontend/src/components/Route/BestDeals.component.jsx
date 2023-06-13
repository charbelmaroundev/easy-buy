import React, { useEffect, useState } from "react";
import { ProductCardComponent } from "./index";
import { useSelector } from "react-redux";

const BestDealsComponent = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.soldOut - a.soldOut);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="mb-4">Best Deals</h1>
        <div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {data &&
              data.length !== 0 &&
              data.map((i, index) => (
                <ProductCardComponent data={i} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { BestDealsComponent };
