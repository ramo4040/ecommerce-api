import { Button } from "@/components/ui/button";
import "./style.css";
import { Search, ShoppingCart } from "lucide-react";

export const HeroRightNavbar = () => {
	return (
		<div id="hero-right-navbar">
			<Button variant="ghost" size="icon">
				<Search strokeWidth={1.5} />
			</Button>

			<Button variant="ghost" size="icon" className="shopping-cart-btn">
				<ShoppingCart strokeWidth={1.5} />
				<p>(0)</p>
			</Button>
		</div>
	);
};
