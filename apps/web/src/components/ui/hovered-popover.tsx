"use client";

import type {
	ComponentProps,
	MouseEvent,
	PointerEvent,
	ReactElement,
	ReactNode,
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const CLOSE_DELAY = 100;

type PopoverProps = Omit<
	ComponentProps<typeof Popover>,
	"children" | "open" | "defaultOpen" | "onOpenChange"
>;
type ContentProps = Omit<ComponentProps<typeof PopoverContent>, "children">;

type HoverPopoverProps = {
	trigger: ReactElement;
	children: ReactNode;
	popoverProps?: PopoverProps;
	contentProps?: ContentProps;
};

export function HoverPopover({
	trigger,
	children,
	popoverProps,
	contentProps,
}: HoverPopoverProps) {
	const [open, setOpen] = useState(false);
	const closeTimerRef = useRef<number | null>(null);

	const clearCloseTimer = () => {
		if (closeTimerRef.current !== null) {
			window.clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
	};

	const scheduleClose = () => {
		clearCloseTimer();
		closeTimerRef.current = window.setTimeout(
			() => setOpen(false),
			CLOSE_DELAY,
		);
	};

	const handleOpenChange = (nextOpen: boolean) => {
		clearCloseTimer();
		setOpen(nextOpen);
	};

	const openPopover = () => {
		clearCloseTimer();
		setOpen(true);
	};

	const handleMouseEnter = () => {
		openPopover();
	};

	const handleMouseLeave = () => {
		scheduleClose();
	};

	const handlePointerEnter = (event: PointerEvent<Element>) => {
		if (event.pointerType === "touch") {
			return;
		}
		openPopover();
	};

	const handlePointerLeave = useCallback(
		(event: PointerEvent<Element>) => {
			if (event.pointerType === "touch") {
				return;
			}
			scheduleClose();
		},
		[scheduleClose],
	);

	useEffect(() => {
		return () => {
			clearCloseTimer();
		};
	}, [clearCloseTimer]);

	const {
		className,
		onMouseEnter: contentOnMouseEnter,
		onMouseLeave: contentOnMouseLeave,
		onPointerEnter: contentOnPointerEnter,
		onPointerLeave: contentOnPointerLeave,
		...restContentProps
	} = contentProps ?? {};

	return (
		<Popover open={open} onOpenChange={handleOpenChange} {...popoverProps}>
			<PopoverTrigger
				asChild
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				onFocus={handleMouseEnter}
				onBlur={handleMouseLeave}
			>
				{trigger}
			</PopoverTrigger>
			<PopoverContent
				{...restContentProps}
				className={cn(className)}
				onMouseEnter={(event: MouseEvent<HTMLDivElement>) => {
					handleMouseEnter();
					contentOnMouseEnter?.(event);
				}}
				onMouseLeave={(event: MouseEvent<HTMLDivElement>) => {
					handleMouseLeave();
					contentOnMouseLeave?.(event);
				}}
				onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
					handlePointerEnter(event);
					contentOnPointerEnter?.(event);
				}}
				onPointerLeave={(event: PointerEvent<HTMLDivElement>) => {
					handlePointerLeave(event);
					contentOnPointerLeave?.(event);
				}}
			>
				{children}
			</PopoverContent>
		</Popover>
	);
}
