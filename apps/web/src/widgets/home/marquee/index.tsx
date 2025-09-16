import type { ComponentProps, FC } from "react";
import "./style.css";

export const Marquee: FC<ComponentProps<"div">> = ({
	children,
	className,
	...props
}) => {
	return (
		<div id="marquee-banner-wrapper" className={className} {...props}>
			<div className="scrolling-container">
				<div className="item">{children}</div>
			</div>
		</div>
	);
};
