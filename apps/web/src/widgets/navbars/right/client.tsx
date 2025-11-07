"use client";

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { type ComponentProps, type FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarSearch } from "../search";
import { ShoppingCartNavbar } from "../shopping-cart";

const pageLinks = [
  { name: "Shop", href: "#" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "#" },
];

export const HeroRightNavbarClient: FC<ComponentProps<"div">> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NavbarSearch />
      <ShoppingCartNavbar />

      <menu id="menu-container">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="menu-btn">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent id="menu-sheet">
            <div>
              <Button
                variant="ghost"
                onClick={() => setMenuOpen(false)}
                className="close-btn"
              >
                <SheetTitle>Close</SheetTitle>
              </Button>
              <div className="items-link-container">
                {children}
                {pageLinks.map((e) => {
                  return (
                    <Link
                      key={e.name}
                      href={{ pathname: e.href }}
                      className="item-link"
                    >
                      {e.name}
                      <ArrowRight />
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </menu>
    </>
  );
};
