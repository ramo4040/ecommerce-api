import "./style.css";
import { ProductsData } from "@/entities/product";
import { ProductCard } from "../card";

export const ShopProductsGrid = () => {
  const products = Array.from({ length: 8 }, (_, i) => (
    <ProductCard product={ProductsData[0]} className="product-size" key={i} />
  ));

  return <div id="shop-products-grid">{products.map((e) => e)}</div>;
};
