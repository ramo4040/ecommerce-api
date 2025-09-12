import "./style.css";
import { HeroLeftNavbar } from "./left";
import { HeroRightNavbar } from "./right";

export const HeroNavbars = () => {
	return (
		<div id="navbars-container">
			<HeroLeftNavbar />
			<HeroRightNavbar />
		</div>
	);
};
