import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import {
  FooterComponent,
  HeaderComponent,
  LoaderComponent,
} from "../components/Layout";
import { ProductCardComponent } from "../components/Route";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.soldOut - a.soldOut);
    setData(sortedData);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div>
          <HeaderComponent activeHeading={2} />
          <div className="container mt-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
              {data.map((i, index) => (
                <ProductCardComponent data={i} key={index} />
              ))}
            </div>
          </div>
          <FooterComponent activeHeading={2} />
        </div>
      )}
    </>
  );
};

export { BestSellingPage };
