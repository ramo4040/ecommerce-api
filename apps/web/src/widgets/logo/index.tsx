import {
	ItemFlipAnimation,
	ItemFlipWrapper,
} from "@/components/item-flip-animation";
import "./style.css";

export const Logo = () => {
	return (
		<div id="logo">
			<ItemFlipWrapper>
				<div className="logo-icon" />
				<ItemFlipAnimation text="Korsiya" hoverText="Home" />
			</ItemFlipWrapper>
		</div>
	);
};
