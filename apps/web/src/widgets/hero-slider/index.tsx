import "./style.css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroNavbars } from "@/widgets";

const sliders = [
	{
		src: "/images/carousel-1.jpg",
		alt: "Hero Image 1",
		href: "#",
		title: "Crafting Comfort: Explore Our Cozy Collection",
		description:
			"Discover the perfect blend of style and comfort with our latest collection.",
	},
	{
		src: "/images/carousel-2.jpg",
		alt: "Hero Image 2",
		href: "#",
		title: "Unwind in Style: Discover Our Relaxing Retreat",
		description:
			"Experience tranquility and elegance with our curated selection of serene designs.",
	},
	{
		src: "/images/carousel-3.jpg",
		alt: "Hero Image 3",
		href: "#",
		title: "Elevate Your Space: Discover Our Premium Collection",
		description:
			"Transform your home into a sanctuary with our exclusive range of high-end designs.",
	},
];

export const HeroSlider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const totalImages = sliders.length;

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % totalImages);
	};

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
	};

	return (
		<div id="hero-slider">
			<HeroNavbars />

			<div
				className="slider-container"
				style={{ "--slider-item-index": currentIndex } as React.CSSProperties}
			>
				<ul className="slider-track">
					{sliders.map((slide, index) => {
						return (
							<li className="slider-item" key={index}>
								<Image
									src={slide.src}
									alt={slide.alt}
									fill
									style={{ objectFit: "cover" }}
								/>

								<div className="details">
									<h2>{slide.title}</h2>
									<p>{slide.description}</p>
									<Link href={{ href: slide.href }}>View Product</Link>
								</div>
							</li>
						);
					})}
				</ul>

				<div className="slider__btn --next">
					<Button variant="default" size={"icon"} onClick={handleNext}>
						<ChevronRight />
					</Button>
				</div>
				<div className="slider__btn --prev">
					<Button variant="default" size={"icon"} onClick={handlePrev}>
						<ChevronLeft />
					</Button>
				</div>

				<nav className="slider__indicators" aria-label="Slide navigation">
					{sliders.map((_, index) => {
						return (
							<Button
								key={index}
								size="icon"
								className="slider__indicator"
								aria-label={`Go to slide ${index + 1}`}
								aria-current={currentIndex === index}
								onClick={() => setCurrentIndex(index)}
							/>
						);
					})}
				</nav>
			</div>
		</div>
	);
};
