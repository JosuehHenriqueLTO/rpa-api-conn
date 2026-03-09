import { getProducts } from "@/actions/auth";
import React from "react";
import ProductItem from "./ProductItem";

const ProductsList = async () => {
  const products = await getProducts();
  if (products.error) {
    return <div>Error: {products.error}</div>;
  }
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <li key={product.id}>
            {/* {product.name} - {product.product_type} */}
            <ProductItem id={product.id} name={product.name} type={product.product_type} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
