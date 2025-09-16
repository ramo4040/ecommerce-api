import "./404.css";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CornerElement } from "@/components/corner-element";

export default function NotFound() {
	return (
		<main>
			<Image
				src="/images/404.jpg"
				alt="Not Found"
				fill
				style={{ objectFit: "cover" }}
			/>
			<CornerElement position="top-left" size="xl">
				<Link href="/" className="back-home-link">
					<ArrowLeft />
					Go back home
				</Link>
			</CornerElement>

			<CornerElement position="bottom-right" size="xl">
				<h1>404 - Page Not Found</h1>
			</CornerElement>
		</main>
	);
}
