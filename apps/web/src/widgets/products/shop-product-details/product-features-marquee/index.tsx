import "./style.css";
import { Globe, type LucideIcon, Package, Truck } from "lucide-react";
import { Marquee } from "@/widgets/home/marquee";

const benefits: { icon: LucideIcon; text: string }[] = [
  { icon: Truck, text: "Free Shipping over 500€" },
  { icon: Globe, text: "Worldwide Shipping" },
  { icon: Package, text: "Free Returns" },
];

export const ProductFeaturesMarquee = () => {
  return (
    <Marquee className="product-features-marquee">
      <ul>
        {benefits.map((benefit, i) => {
          return (
            <li key={i}>
              <benefit.icon className="icon" />
              <span className="benefit-text">{benefit.text}</span>
            </li>
          );
        })}
      </ul>
    </Marquee>
  );
};
