import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";
import "./style.css";

export const Logo = ({
	hoverText = "Home",
	isDark = true,
}: {
	hoverText?: string;
	isDark?: boolean;
}) => {
	return (
		<div
			id="logo"
			style={
				{
					"--bg": isDark ? "var(--foreground)" : "var(--background)",
				} as React.CSSProperties
			}
		>
			<ItemFlipWrapper>
				<div className="logo-icon" />
				<ItemFlipAnimation text="Korsiya" hoverText={hoverText} />
			</ItemFlipWrapper>
		</div>
	);
};
