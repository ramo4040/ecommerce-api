import "./style.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { Footer, HeroNavbars, SocialLinks } from "@/widgets";

export const metadata: Metadata = {
	title: "about",
	description: "about",
};

const pageConfigs = {
	faq: { image: "/images/faq.jpg", title: "FAQ" },
	contact: { image: "/images/contact.jpg", title: "Contact" },
	about: { image: "/images/about-1.jpg", title: "About Us" },
};

interface LayoutProps {
	children: React.ReactNode;
}

const getRouteFromHeaders = async (): Promise<string | null> => {
	try {
		const headerList = await headers();
		const pathname = headerList.get("x-current-path");
		return pathname?.split("/")[1] || null;
	} catch (error) {
		console.error("Error getting route:", error);
		return null;
	}
};

const Layout = async ({ children }: LayoutProps) => {
	const route = await getRouteFromHeaders();
	const config = pageConfigs[route as keyof typeof pageConfigs];

	return (
		<main id="about-layout">
			<HeroNavbars isFixed />

			<section className="content-wrapper">
				<div className="image">
					<div>
						<Image
							src={config?.image}
							alt={config?.title}
							fill
							style={{ objectFit: "cover" }}
						/>
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
