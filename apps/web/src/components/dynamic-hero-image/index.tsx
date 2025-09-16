"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const pageConfigs = {
	faq: { image: "/images/faq.jpg", title: "FAQ" },
	contact: { image: "/images/contact.jpg", title: "Contact" },
	about: { image: "/images/about-1.jpg", title: "About Us" },
};

const DynamicHeroImage = () => {
	const pathname = usePathname();
	const route = pathname.split("/")[1];
	const config = pageConfigs[route as keyof typeof pageConfigs];

	return (
		<Image
			src={config?.image}
			alt={config?.title}
			fill
			style={{ objectFit: "cover" }}
		/>
	);
};

export default DynamicHeroImage;
