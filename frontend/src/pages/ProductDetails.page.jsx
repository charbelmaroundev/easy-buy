import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  ProductDetailsComponent,
  SuggestedProductComponent,
} from "../components/Products";
import { FooterComponent, HeaderComponent } from "../components/Layout";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    setData(data);
  }, [allProducts, id]);

  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <ProductDetailsComponent data={data} />

        {data && <SuggestedProductComponent data={data} />}
      </div>
      <FooterComponent />
    </div>
  );
};

export { ProductDetailsPage };
