"use client";

import "./style.css";
import { useState } from "react";
import { SliderBtn } from "@/components/slider-btn";
import { ProductsData } from "@/entities/product";
import { ProductCard } from "@/widgets/products/card";

export const HomeProductsSlider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const products = Array.from({ length: 8 }, (_, i) => (
		<ProductCard product={ProductsData[0]} className="product-size" key={i} />
	));
	const productsLenght = products.length / 2;

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % productsLenght);
	};

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + productsLenght) % productsLenght);
	};

	return (
		<section id="home-products-slider">
			<div
				className="slider-track"
				style={{ "--current-index": currentIndex } as React.CSSProperties}
			>
				{products.map((e) => e)}
			</div>

			<SliderBtn handleNext={handleNext} handlePrev={handlePrev} />
		</section>
	);
};
