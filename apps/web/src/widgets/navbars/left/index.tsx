import "./style.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CornerElement } from "@/components/corner-element";
import {
  ItemFlipAnimation,
  ItemFlipWrapper,
} from "@/components/item-flip-animation";
import { ThemeToggle } from "@/components/theme-toggle";
import { HoverPopover } from "@/components/ui/hovered-popover";
import { Logo } from "@/widgets";
import { Collections } from "../collections";

export const abouts = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export const HeroLeftNavbar = async () => {
  return (
    <CornerElement position="top-left" size="xl" id="hero-left-navbar">
      <ul>
        <li>
          <Logo />
        </li>

        <li>
          <ItemFlipWrapper>
            <Link href={{ pathname: "/shop" }}>
              <ItemFlipAnimation text="Shop" />
            </Link>
          </ItemFlipWrapper>
        </li>

        <li>
          <HoverPopover
            trigger={
              <ItemFlipWrapper hasIcon>
                <ItemFlipAnimation text="Collections" />
              </ItemFlipWrapper>
            }
            contentProps={{ className: "menu-card-content" }}
          >
            <Collections />
          </HoverPopover>
        </li>

        <li>
          <HoverPopover
            trigger={
              <ItemFlipWrapper hasIcon>
                <ItemFlipAnimation text="About" />
              </ItemFlipWrapper>
            }
            contentProps={{ className: "menu-card-content about" }}
          >
            {abouts.map((about) => (
              <ItemFlipWrapper key={about.name}>
                <Link href={{ pathname: about.href }} className="item">
                  <h4>{about.name}</h4>

                  <ItemFlipAnimation
                    text={<ArrowRight size={14} />}
                    className="icon"
                  />
                </Link>
              </ItemFlipWrapper>
            ))}
          </HoverPopover>
        </li>

        <li>
          <ItemFlipWrapper>
            <Link href={{ pathname: "/blog" }}>
              <ItemFlipAnimation text="Blog" />
            </Link>
          </ItemFlipWrapper>
        </li>

        <li>
          <ThemeToggle />
        </li>
      </ul>
    </CornerElement>
  );
};
