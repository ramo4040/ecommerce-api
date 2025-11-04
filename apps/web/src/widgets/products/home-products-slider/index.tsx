"use client";

import "./style.css";
import { useEffect, useRef, useState } from "react";
import { SliderBtn } from "@/components/slider-btn";
import type { Product } from "@/entities/product";
import { ProductCard } from "@/widgets/products/card";

export const HomeProductsSlider = ({ products }: { products: Product[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemPerRow, setItemPerRow] = useState(4);
  const trackerRef = useRef<HTMLDivElement>(null);
  const productsLength = products.length - itemPerRow + 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % productsLength);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + productsLength) % productsLength);
  };

  // get itemPerRow based on css variable --items-per-row
  useEffect(() => {
    const updateItemsPerRow = () => {
      if (!trackerRef.current) return;
      const itemsPerRow = getComputedStyle(trackerRef.current).getPropertyValue(
        "--items-per-row",
      );
      setItemPerRow(Number.parseInt(itemsPerRow, 10));
    };

    window.addEventListener("resize", updateItemsPerRow);
    updateItemsPerRow();

    return () => {
      window.removeEventListener("resize", updateItemsPerRow);
    };
  }, []);

  return (
    <section id="home-products-slider">
      <div
        ref={trackerRef}
        className="slider-track"
        style={{ "--current-index": currentIndex } as React.CSSProperties}
      >
        {products.map((e) => (
          <ProductCard product={e} className="product-size" key={e.id} />
        ))}
      </div>

      <SliderBtn handleNext={handleNext} handlePrev={handlePrev} />
    </section>
  );
};
