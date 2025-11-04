"use client";

import "./style.css";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfinityProductsQuery } from "@/entities/product";
import { ProductCard } from "../card";

export const ShopProductsGrid = ({ categoryId }: { categoryId?: number }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfinityProductsQuery({
    categoryId,
  });

  const products = data?.pages.flatMap((page) =>
    page.data ? page.data.data : [],
  );

  // Auto-fetch when scrolling to bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div id="shop-products-grid">
      {products?.map((e, i) => {
        return (
          <ProductCard
            product={e}
            className="product-size"
            key={e.id}
            ref={i === products.length - 1 ? ref : null}
          />
        );
      })}
    </div>
  );
};
