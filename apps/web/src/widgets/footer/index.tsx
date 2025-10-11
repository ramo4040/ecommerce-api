import "./style.css";
import Link from "next/link";
import {
  ItemFlipAnimation,
  ItemFlipWrapper,
} from "@/components/item-flip-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "../logo";

const navigationGroups = [
  {
    title: "Pages",
    links: [
      { text: "Home", href: "/" },
      { text: "Shop", href: "/shop" },
      { text: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Help",
    links: [
      { text: "FAQ", href: "/faq" },
      { text: "Contact", href: "/contact" },
      { text: "Terms", href: "/terms" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-details">
        <div className="description">
          <Logo hoverText="Shop" isDark={false} />
          <p>
            Scandinavian furniture, meticulously handcrafted to bring warmth and
            elegance into your home.
          </p>
        </div>

        <div className="nav-links">
          {navigationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="link-group">
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <ItemFlipWrapper>
                      <Link href={{ href: link.href }}>
                        <ItemFlipAnimation text={link.text} />
                      </Link>
                    </ItemFlipWrapper>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="newsletter">
        <h1>Join our newsletter and get 20% off your first purchase</h1>
        <Input type="email" placeholder="Enter your email address" />
        <Button size={"lg"} variant="secondary">
          Subscribe
        </Button>
      </div>
    </footer>
  );
};
