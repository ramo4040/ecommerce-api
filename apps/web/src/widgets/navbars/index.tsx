import "./style.css";
import { cn } from "@/lib/utils";
import { HeroLeftNavbar } from "./left";
import { HeroRightNavbar } from "./right";

export const HeroNavbars = ({ isFixed = false }: { isFixed?: boolean }) => {
  return (
    <div id="navbars-container" className={cn(isFixed && "fixed")}>
      <HeroLeftNavbar />
      <HeroRightNavbar />
    </div>
  );
};
