import "./style.css";
import { Plus } from "lucide-react";
import type { ComponentProps, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FlipAnimationProps extends ComponentProps<"div"> {
	text: string | ReactNode;
	hoverText?: string | ReactNode;
}

interface FlipWrapperProps extends ComponentProps<"div"> {
	hasIcon?: boolean;
}

export const ItemFlipAnimation: FC<FlipAnimationProps> = ({
	text,
	hoverText,
	className,
	...props
}) => {
	return (
		<div className={cn("flip-animate", className)} {...props}>
			<span>{text}</span>
			<span>{hoverText || text}</span>
		</div>
	);
};

export const ItemFlipWrapper: FC<FlipWrapperProps> = ({
	children,
	hasIcon = false,
	...props
}) => {
	return (
		<div id="flip-wrapper" {...props}>
			{children}
			{hasIcon && <Plus className="plus-icon" />}
		</div>
	);
};
