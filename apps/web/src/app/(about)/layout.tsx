import "./style.css";
import type { Metadata } from "next";
import { CornerElement } from "@/components/corner-element";
import DynamicHeroImage from "@/components/dynamic-hero-image";
import { Footer, HeroNavbars, SocialLinks } from "@/widgets";

export const metadata: Metadata = {
	title: "about",
	description: "about",
};

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<main id="about-layout">
			<HeroNavbars isFixed />

			<section className="content-wrapper">
				<div className="image">
					<div>
						<DynamicHeroImage />
						<CornerElement position="bottom-right">
							We are {process.env.NEXT_PUBLIC_COMPANY_NAME}
						</CornerElement>
					</div>
				</div>

				<div className="content">{children}</div>
			</section>

			<SocialLinks />
			<Footer />
		</main>
	);
};

export default Layout;
