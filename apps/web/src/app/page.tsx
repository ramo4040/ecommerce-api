import { Armchair, Car, Globe, Package } from "lucide-react";
import {
	AboutSection,
	AnnouncementBanner,
	Footer,
	HeroSlider,
	HomeProductsSlider,
	HomeSections,
	SocialLinks,
} from "@/widgets";

export default function Home() {
	return (
		<main id="home-page">
			<section id="hero-section">
				<AnnouncementBanner />
				<HeroSlider />
			</section>

			<section id="features-section">
				<div className="feature">
					<Car /> <h4>Free Shipping over 500€</h4>
				</div>
				<div className="feature">
					<Globe /> <h4>Worldwide Shipping</h4>
				</div>
				<div className="feature">
					<Package /> <h4>Free Returns</h4>
				</div>
				<div className="feature">
					<Armchair /> <h4>5-Year Warranty</h4>
				</div>
			</section>

			<section className="home-page-separator">
				<h2>Our Favorites</h2>
			</section>

			<HomeProductsSlider />

			<section className="home-page-separator">
				<h2>Collections</h2>
			</section>

			<HomeSections />

			<section className="home-page-separator">
				<h2>About Us</h2>
			</section>

			<AboutSection />

			<SocialLinks />

			<Footer />
		</main>
	);
}
