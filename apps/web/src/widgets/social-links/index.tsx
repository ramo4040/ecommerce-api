import "./style.css";
import {
	ArrowUpRight,
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";

export const SocialLinks = () => {
	return (
		<section id="social-links">
			<Link href="#" className="social-link">
				<ItemFlipWrapper>
					Facebook
					<ItemFlipAnimation text={<Facebook />} hoverText={<ArrowUpRight />} />
				</ItemFlipWrapper>
			</Link>

			<Link href="#" className="social-link">
				<ItemFlipWrapper>
					Instagram
					<ItemFlipAnimation
						text={<Instagram />}
						hoverText={<ArrowUpRight />}
					/>
				</ItemFlipWrapper>
			</Link>

			<Link href="#" className="social-link">
				<ItemFlipWrapper>
					Twitter
					<ItemFlipAnimation text={<Twitter />} hoverText={<ArrowUpRight />} />
				</ItemFlipWrapper>
			</Link>

			<Link href="#" className="social-link">
				<ItemFlipWrapper>
					LinkedIn
					<ItemFlipAnimation text={<Linkedin />} hoverText={<ArrowUpRight />} />
				</ItemFlipWrapper>
			</Link>
		</section>
	);
};
