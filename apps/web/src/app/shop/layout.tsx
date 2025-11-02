import "./style.css";
import { Footer, HeroNavbars, SocialLinks } from "@/widgets";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="shop-page-container">
      <HeroNavbars isFixed />
      {children}
      <SocialLinks />
      <Footer />
    </main>
  );
}
