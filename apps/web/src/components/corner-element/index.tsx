import type { ComponentProps, FC } from "react";
import "./style.css";
import { cn } from "@/lib/utils";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type Props = ComponentProps<"div"> & {
  position: CornerPosition;
  size?: "sm" | "md" | "lg" | "xl";
};

export const CornerElement: FC<Props> = ({
  children,
  position,
  size = "lg",
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "corner-element",
        `corner-${position}`,
        `corner-size-${size}`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
