import "./style.css";
import Image from "next/image";
import { HeroNavbars } from "@/widgets";

export const HeroSlider = () => {
  return (
    <div id="hero-slider">
      <HeroNavbars />

      <div className="slider-container">
        {/* image placeholder */}
        <Image
          src="/images/carousel-1.jpg"
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
