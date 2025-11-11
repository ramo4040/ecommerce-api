"use client";

import { ArrowRight, Menu, User2 } from "lucide-react";
import Link from "next/link";
import { type ComponentProps, type FC, useState } from "react";
import {
  ItemFlipAnimation,
  ItemFlipWrapper,
} from "@/components/item-flip-animation";
import { Button } from "@/components/ui/button";
import { HoverPopover } from "@/components/ui/hovered-popover";
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

const accountPages = [
  {
    isAuth: false,
    pages: [
      { name: "Login", href: "/auth/login" },
      { name: "Register", href: "/auth/register" },
    ],
  },
];

export const HeroRightNavbarClient: FC<ComponentProps<"div">> = ({
  children,
}) => {
  const isAuth = false;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NavbarSearch />
      <HoverPopover
        trigger={
          <div>
            <Button variant="ghost" size="icon">
              <User2 strokeWidth={1.5} />
            </Button>
          </div>
        }
        contentProps={{ className: "menu-card-content about" }}
      >
        {accountPages
          .filter((page) => page.isAuth === isAuth)[0]
          .pages.map((page) => (
            <ItemFlipWrapper key={page.name}>
              <Link href={{ pathname: page.href }} className="item">
                <h4>{page.name}</h4>

                <ItemFlipAnimation
                  text={<ArrowRight size={14} />}
                  className="icon"
                />
              </Link>
            </ItemFlipWrapper>
          ))}
      </HoverPopover>

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
