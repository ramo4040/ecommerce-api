import {
  ItemFlipAnimation,
  ItemFlipWrapper,
} from "@/components/item-flip-animation";
import "./style.css";
import Link from "next/link";

export const Logo = ({
  hoverText = "Home",
  isDark = true,
}: {
  hoverText?: string;
  isDark?: boolean;
}) => {
  return (
    <Link
      href={{ pathname: "/" }}
      id="logo"
      style={
        {
          "--bg": isDark ? "var(--foreground)" : "var(--background)",
        } as React.CSSProperties
      }
    >
      <ItemFlipWrapper>
        <div className="logo-icon" />
        <ItemFlipAnimation
          text={process.env.NEXT_PUBLIC_COMPANY_NAME}
          hoverText={hoverText}
        />
      </ItemFlipWrapper>
    </Link>
  );
};
