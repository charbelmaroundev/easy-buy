import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FooterComponent,
  HeaderComponent,
  LoaderComponent,
} from "../components/Layout";
import { ProductCardComponent } from "../components/Route";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <HeaderComponent activeHeading={3} />
          <div className="container mt-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
              {data &&
                data.map((i, index) => (
                  <ProductCardComponent data={i} key={index} />
                ))}
            </div>

            {data && data.length === 0 ? (
              <h1
                className="text-center w-100 pb-20 text-2xl"
                style={{ height: "74vh" }}
              >
                No products Found!
              </h1>
            ) : null}
          </div>
          <FooterComponent activeHeading={3} />
        </>
      )}
    </>
  );
};

export { ProductsPage };
