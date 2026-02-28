import { getProducts } from "@/actions/auth";
import React from "react";

const ProductsList = async () => {
  const products = await getProducts();
  if (products.error) {
    return <div>Error: {products.error}</div>;
  }
  return (
    <div>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            {product.name} - {product.product_type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
