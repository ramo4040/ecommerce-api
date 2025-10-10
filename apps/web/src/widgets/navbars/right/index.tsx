import "./style.css";
import { CornerElement } from "@/components/corner-element";
import { Collections } from "../collections";
import { HeroRightNavbarClient } from "./client";

export const HeroRightNavbar = async () => {
	return (
		<CornerElement position="top-right" size="xl" id="hero-right-navbar">
			<HeroRightNavbarClient>
				<Collections className="collections" />
			</HeroRightNavbarClient>
		</CornerElement>
	);
};
