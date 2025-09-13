import "./style.css";
import {
	ArrowUpRight,
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from "lucide-react";
import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";

const socialLinks = [
	{
		name: "Facebook",
		href: "https://facebook.com",
		icon: <Facebook />,
	},
	{
		name: "Instagram",
		href: "https://instagram.com",
		icon: <Instagram />,
	},
	{
		name: "Twitter",
		href: "https://twitter.com",
		icon: <Twitter />,
	},
	{
		name: "LinkedIn",
		href: "https://linkedin.com",
		icon: <Linkedin />,
	},
];

export const SocialLinks = () => {
	return (
		<section id="social-links">
			{socialLinks.map((social, index) => (
				<a
					key={index}
					href={social.href}
					className="social-link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ItemFlipWrapper>
						{social.name}
						<ItemFlipAnimation
							text={social.icon}
							hoverText={<ArrowUpRight />}
						/>
					</ItemFlipWrapper>
				</a>
			))}
		</section>
	);
};
