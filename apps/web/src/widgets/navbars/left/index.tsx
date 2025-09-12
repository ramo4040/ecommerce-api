import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";
import "./style.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Logo } from "@/widgets";

const collections = [
	{ name: "Dark", description: "A dark and moody theme", href: "/dark" },
	{ name: "Light", description: "A bright and airy theme", href: "/light" },
	{
		name: "Modern",
		description: "A sleek and contemporary theme",
		href: "/modern",
	},
];

const abouts = [
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
	{ name: "FAQ", href: "/faq" },
];

export const HeroLeftNavbar = () => {
	return (
		<nav id="hero-left-navbar">
			<ul>
				<li>
					<Logo />
				</li>

				<li>
					<ItemFlipWrapper>
						<Link href={{ href: "/shop" }}>
							<ItemFlipAnimation text="Shop" />
						</Link>
					</ItemFlipWrapper>
				</li>

				<li>
					<HoverCard openDelay={100} closeDelay={100}>
						<HoverCardTrigger asChild>
							<ItemFlipWrapper hasIcon>
								<ItemFlipAnimation text="Collections" />
							</ItemFlipWrapper>
						</HoverCardTrigger>

						<HoverCardContent className="menu-card-content">
							{collections.map((collection) => (
								<ItemFlipWrapper key={collection.name}>
									<Link href={{ href: collection.href }} className="item">
										<div className="img-wrapper" />

										<h4>{collection.name}</h4>

										<ItemFlipAnimation
											text={<ArrowRight size={14} />}
											className="icon"
										/>
									</Link>
								</ItemFlipWrapper>
							))}
						</HoverCardContent>
					</HoverCard>
				</li>

				<li>
					<HoverCard openDelay={100} closeDelay={100}>
						<HoverCardTrigger asChild>
							<ItemFlipWrapper hasIcon>
								<ItemFlipAnimation text="About" />
							</ItemFlipWrapper>
						</HoverCardTrigger>
						<HoverCardContent className="menu-card-content about">
							{abouts.map((about) => (
								<ItemFlipWrapper key={about.name}>
									<Link href={{ href: about.href }} className="item">
										<h4>{about.name}</h4>

										<ItemFlipAnimation
											text={<ArrowRight size={14} />}
											className="icon"
										/>
									</Link>
								</ItemFlipWrapper>
							))}
						</HoverCardContent>
					</HoverCard>
				</li>

				<li>
					<ItemFlipWrapper>
						<Link href={{ href: "/blog" }}>
							<ItemFlipAnimation text="Blog" />
						</Link>
					</ItemFlipWrapper>
				</li>

				<li>
					<ThemeToggle />
				</li>
			</ul>
		</nav>
	);
};
